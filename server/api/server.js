const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
require('dotenv').config();
const { createAdmin } = require('./controllers/createAdmin');
const subscriptionService = require("./services/subscriptionService");
const { MONGO_URI } = process.env;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Routes
app.use('/api', authRoute);
app.use('/api/admin', adminRoute);

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
