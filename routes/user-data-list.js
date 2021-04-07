'use strict';

const express = require('express');
const router = express.Router();

// User Data List Controllers
const {
    getUserDataList
} = require('../controllers/user-data-list.controller');



// List of User-data, Vehicle, States

router.get('/', getUserDataList);



module.exports = router;