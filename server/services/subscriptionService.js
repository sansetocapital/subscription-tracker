const Subscription = require("../models/subScribeModel");
const emailService = require('./emailService');
const {updateExpired} = require('../controllers/adminController')

exports.sendExpiryReminders = async () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    try {
        const expiringSubscriptions = await Subscription.find({
            endDate: {
                $gte: today,
                $lte: tomorrow
            }, 
            expired: false,
        }).populate('userId');

        // Send reminders
        // let remindersSent = 0;
        for (const sub of expiringSubscriptions) {
            const user = sub.userId;
            const statusCode = await emailService.sendEmail(
                user.email,
                process.env.MESSAGE_SENDER,
                sub.name,
                sub.plan,
                sub.startDate,
                sub.endDate,
                true
            );
            await updateExpired(sub.userId);
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}