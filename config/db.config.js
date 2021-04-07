'use strict';

const mysql = require('mysql');

const dbConnect = mysql.createConnection({
    host: "localhost",
    user: "demo",
    password: "demo123",
    database: "demodb"
});

dbConnect.connect(err => {
    if (err) throw err;
    console.log('Connection Established');
});

module.exports = { dbConnect };