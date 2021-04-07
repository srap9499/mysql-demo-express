'use strict';

const express = require('express');
const router = express.Router();

// Vehicle Registration Controllers
const {
    getVehicleRegistration,
    avoidDuplicateVehicleRegistration,
    addVehicleRegistration,
    inVehicleRegistration,
    editVehicleRegistration,
    deleteVehicleRegistration
} = require('../controllers/vehicle-registration.controller');



// Vehicle Registration Routes

router.get('/', getVehicleRegistration);

router.post('/', avoidDuplicateVehicleRegistration, addVehicleRegistration);

router.put('/', inVehicleRegistration, editVehicleRegistration);

router.delete('/', inVehicleRegistration, deleteVehicleRegistration);



module.exports = router;