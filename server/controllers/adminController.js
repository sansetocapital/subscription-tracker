const Admin = require("../models/adminModel");
const Subscription = require("../models/subScribeModel");
const User = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailService = require('../services/emailService');
require('dotenv').config();

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err)
    }
}

module.exports.getUserCounts = async (req, res) => {
    try {
        const userCounts = await User.countDocuments();
        const expiredCounts = await Subscription.find({isExpired:true}).countDocuments();
        res.status(200).json({
            total: userCounts,
            expired: expiredCounts,
            active: userCounts - expiredCounts,
        })
    } catch (err) {
        console.log(err);
    }
}
module.exports.getGroupedSubscriptions = async (req, res) => {
    try {
        const results = await Subscription.aggregate([
            {
                $lookup: {
                    from: 'users', 
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true 
                }
            },
        ]);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching grouped subscriptions:", error);
    }
}

module.exports.manageSubscription = async (req, res) => {
    const { _id, paymentAmount, paymentMode, accessStatus, plan, startDate, endDate } = req.body;
    try {
        const updatedSubscription = await Subscription.findOneAndUpdate(
            { _id: _id },
            { paymentAmount, paymentMode, accessStatus, plan, startDate, endDate },
            { new: true }
        );
        const isExpired = (new Date(endDate) < new Date())
        const subscription = await Subscription.findById({_id});
        subscription.isExpired = isExpired;
        await subscription.save();
        if (!updatedSubscription) {
            return res.status(404).json({ error: 'Subscription not found!' })
        }
        if(accessStatus=="Granted") {
            const statusCode = await emailService.sendEmail(req.body.userDetails.email, process.env.MESSAGE_SENDER, req.body.userDetails.name, plan, startDate, endDate)
            res.status(statusCode).json({
                message: statusCode==200 ? 'Success' : 'Invalid',
            })
        }
        res.status(200).json({
            message: 'The user data has been updated!',
        })
    } catch (err) {
        console.error("Error updating subscription and user:", err);
        res.status(500).json({ error: "An error occurred while updating data" });
    }
}

module.exports.loginAmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Admin with that username does not exist!' });
        }

        const isPasswordValid = bcryptjs.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Password!' })
        }

        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })

        // Send token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        }).status(200).json({
            message: 'success', token
        })
    } catch (err) {
        console.log(err);
    }
}
module.exports.updateExpired = async (sub_id) => {
    Subscription.updateOne(
        { _id: sub_id },
        { $set: { isExpired: true } }
      );
}