const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: null,
    },
    email: {
        type: String,
        required: true,
        default: null,
    },
    tradingViewID: {
        type: String,
        required: true,
        default: null,
    },
    whatsAppNumber: {
        type: String,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema);