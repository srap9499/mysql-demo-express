'use strict';

const jwt = require('jsonwebtoken');


// User Authorize
const userAuthorize = (req, res, next) => {
    const payload = {
        ID: req.query.ID,
        Name: req.body.Name,
        Email: req.body.Email
    }

    const token = jwt.sign(payload, "secret", {expiresIn: 3600});
    res.status(200).json({token: token}).send();
};

const userValidate = (req, res, next) => {
    console.log('hello');
};




module.exports = {
    userAuthorize
};