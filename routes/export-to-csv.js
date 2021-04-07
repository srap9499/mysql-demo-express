'use strict';

const express = require('express');
const router = express.Router();

// Export Csv Controller
const {
    exportCsv
} = require('../controllers/export-to-csv.controller');


// Export to csv Route
router.get('/', exportCsv);




module.exports = router;