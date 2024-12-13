const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const { createAdmin } = require('./controllers/createAdmin');
require('dotenv').config();
const { MONGO_URI, PORT} = process.env;
const app = express();
const subscriptionService = require("./services/subscriptionService");




mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected!');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        // createAdmin()
        
        app.use(
            cors({
                origin: '*',
            })
        )

        app.use('/api', authRoute);
        app.use('/api/admin', adminRoute);


        http.Server(app).listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })

    })
    .catch((err) => {
        console.log(err);
    });


