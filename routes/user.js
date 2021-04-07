'use strict';

const express = require('express');
const router = express.Router();

// User Controllers
const {
    getUser,
    avoidDuplicateUser,
    addUser,
    inUser,
    editUser,
    deleteUser
} = require('../controllers/user.controller');



// User Routes

router.get('/', getUser);

router.post('/', avoidDuplicateUser, addUser);

router.put('/', inUser, editUser);

router.delete('/', inUser, deleteUser);



module.exports = router;