const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    plan: {
        type: String,
        enum: ['Free Trial', '1 Month', '6 Months', '1 Year'],
        default: 'Free Trial',
        // required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
        // required: true,
    },
    endDate: {
        type: Date,
        default: Date.now()
        // required: true,
    },
    paymentAmount: {
        type: Number,
        default: 0,
    },
    paymentMode: {
        type: String,
        enum: ['G-Pay', 'Bank-Transfer', 'Crypto-Transfer', 'Online-Purchase'],
        default: 'Bank-Transfer',
    },
    accessStatus: {
        type: String,
        enum: ['Granted', 'Pending'],
        default: 'Pending',
    },
    comments: {
        type: String,
    },
    // to check the expried message notificatioin
    isExpired: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Subscription', subscriptionSchema);