'use strict';

const express = require('express');

// Import Routers
const userRouter = require('./routes/user');
const vehicleRouter = require('./routes/vehicle');
const vehicleRegistrationRouter = require('./routes/vehicle-registration');
const userDataListRouter = require('./routes/user-data-list');
const vehicleListRouter = require('./routes/vehicle-list');
const exportToCsv = require('./routes/export-to-csv');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/user', userRouter);
app.use('/vehicle', vehicleRouter);
app.use('/vehicleRegistration', vehicleRegistrationRouter);
app.use('/userDataList', userDataListRouter);
app.use('/vehicleList', vehicleListRouter);
app.use('/exportToCsv', exportToCsv);






const port = process.env.PORT || 3000;
app.listen(port);