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
    deleteUser,
    isUser,
    getDashboard
} = require('../controllers/user.controller');

// Auth Middlewares
const {
    userAuthorize,
    userAuthenticate
} = require('../middlewares/auth.middleware');



// User Routes

router.get('/', getUser);

router.post('/', avoidDuplicateUser, addUser);

router.put('/', inUser, editUser);

router.delete('/', inUser, deleteUser);

router.post('/login', isUser , userAuthorize);

router.get('/dashboard', userAuthenticate, getDashboard)



module.exports = router;