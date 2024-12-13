const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
require('dotenv').config();
const { createAdmin } = require('./controllers/createAdmin');
const { subScribe } = require('./controllers/authController');
const {getAllSubscribers, getGroupedSubscriptions, manageSubscription, loginAmin} = require('./controllers/adminController');
const subscriptionService = require("./services/subscriptionService");
const { MONGO_URI } = process.env;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Routes
app.use('/api/user', subScribe);
app.use('/api/admin/login', loginAdmin);
router.get('/api/admin/getAllSubscription', getGroupedSubscriptions)
router.post('/api/admin/manageSubscription', manageSubscription);

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
