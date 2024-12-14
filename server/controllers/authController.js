const User = require("../models/userModel");
const Subscription = require('../models/subScribeModel')

module.exports.subScribe = async (req, res) => {

    const expiresIn = [7, 30, 210, 395];
    const plans = ['Free Trial', '1 Month', '6 Months', '1 Year'];
    console.log(req.body, '....viewID')
    try {
        const isActiveUser = await findActiveUsers(req.body.tradingViewID);

        if(isActiveUser) {
            res.status(412).json({message:`TradingView ID ${req.body.tradingViewID} already exists!`})
            return
        }
        else {
            const userData = await new User(req.body);
            const subscription = await new Subscription({
                userId: userData._id
            })
            const currentDate = new Date();
            const endDate = new Date(currentDate.getTime() + expiresIn[req.body.subscriptionID] * 24 * 60 * 60 * 1000);
            subscription.endDate = endDate;
            subscription.plan = plans[req.body.subscriptionID];
            const isExpired = (endDate - currentDate) < 0;
            subscription.isExpired = isExpired;
            subscription.save();
            userData.save();
            res.status(200).json({message: 'Thanks for your subscription request!'});
        }
        
    } catch (err) {
        console.log(err)
    }
}

const findActiveUsers = async (tradingViewID) => {
    try {
        const currentDateTime = new Date(); 
        const results = await Subscription.aggregate([
            {
                $match: {
                    endDate: { $gt: currentDateTime }, 
                },
            },
            {
                $lookup: {
                    from: 'users', 
                    localField: 'userId', 
                    foreignField: '_id', 
                    as: 'userDetails', 
                }
            },
            {
                $unwind: '$userDetails' 
            },
            {
                $match: {
                    'userDetails.tradingViewID': tradingViewID, 
                }
            },
            {
                $project: {
                    userId: 1,
                    plan: 1,
                    startDate: 1,
                    endDate: 1,
                    paymentAmount: 1,
                    paymentMode: 1,
                    accessStatus: 1,
                    comments: 1,
                    isExpired: 1,
                    userDetails: {
                        name: '$userDetails.name',
                        email: '$userDetails.email',
                        tradingViewID: '$userDetails.tradingViewID',
                        whatsAppNumber: '$userDetails.whatsAppNumber',
                    }
                }
            }
        ]);
        return results.length? true : false; 
    } catch (error) {
        return false;
    }
}
