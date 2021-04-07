'use strict';

const express = require('express');
const router = express.Router();

// Vehicle Controllers
const {
    getVehicle,
    avoidDuplicateVehicle,
    addVehicle,
    inVehicle,
    editVehicle,
    deleteVehicle
} = require('../controllers/vehicle.controller');



// Vehicle Routes

router.get('/', getVehicle);

router.post('/', avoidDuplicateVehicle, addVehicle);

router.put('/', inVehicle, editVehicle);

router.delete('/', inVehicle, deleteVehicle);



module.exports = router;