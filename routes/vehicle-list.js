'use strict';

const express = require('express');
const router = express.Router();

// Vehicle List Controllers
const {
    getVehicleListByUser,
    getVehicleListByState
} = require('../controllers/vehicle-list.controller');



// Vehicle List Routes

router.get('/byUser/', getVehicleListByUser);
router.get('/byState/', getVehicleListByState);



module.exports = router;