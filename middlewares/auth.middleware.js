'use strict';

const jwt = require('jsonwebtoken');


// User Authorize
const userAuthorize = (req, res, next) => {
    const payload = {
        ID: req.ID,
        Name: req.body.Name,
        Email: req.body.Email
    }

    const token = jwt.sign(payload, "My secret my secret none of your secret", {expiresIn: 3600});
    res.status(200).json({token: token}).send();
};


// User Authentication
const userAuthenticate = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (!authToken) {
        res.status(401).send("Unauthorized!");
    } else {
        const token = authToken.split(' ')[1];

        jwt.verify(token, "My secret my secret none of your secret", (err, payload) => {
            if (err) {
                res.status(401).send("Unauthorized!");
            } else {
                req.payload = payload;
                console.log(payload);
                next();
            }
        });
    }
};




module.exports = {
    userAuthorize,
    userAuthenticate
};