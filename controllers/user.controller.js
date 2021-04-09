'use strict';

const { dbConnect } = require('../config/db.config');



// User Operations

const getUser = (req, res, next) => {
    const userName = req.query.Name;
    let condition = '';
    if (userName) {
        condition = `WHERE Name = '${userName}'`;
    }
    const getUserSql = `SELECT * FROM User ${condition}`;
    dbConnect.query(getUserSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {            
            const Exists = Boolean(result.length);
            if (Exists) {
                console.log('Selected Successfully');
                res.status(200).send(result);
            } else {
                console.log('No User Found');
                res.status(404).send();
            }
        }
    });
};

const avoidDuplicateUser = (req, res, next) => {
    const { Name, Email, Password, StateID, Status} = req.body;
    if (!Name || !Email || !Password || !StateID || Status === undefined || Status === null ) {
        res.status(406).send();   
    } else {
        const avoidDuplicateUserSql = `SELECT * FROM User
        where (Name, Email, Password, StateID, Status) = ('${Name}', '${Email}', '${Password}', ${StateID}, ${Status})`;
        dbConnect.query(avoidDuplicateUserSql, (err, result) => {
            if (err) {
                res.status(500).send();
            } else {
                const Exists = Boolean(result.length);
                if (Exists) {
                    res.status(208).send();
                } else {
                    next();
                }
            }
        });
    }
};

const addUser = (req, res, next) => {
    const { Name, Email, Password, StateID, Status} = req.body;    
    const addUserSql = `INSERT INTO User
    (Name, Email, Password, StateID, Status) 
    VALUES ('${Name}', '${Email}', '${Password}', ${StateID}, ${Status})`;
    dbConnect.query(addUserSql, (err) => {
        if (err) {
            res.status(500).send();
        } else {
            console.log('Inserted Successfully');
            res.status(200).send();
        }
    });
};

const inUser = (req, res, next) => {
    const ID = req.body.ID;
    if (!ID) {
        res.status(406).send();
    } else {
        const inUserSql = `SELECT * FROM User where ID = ${ID}`;
        dbConnect.query(inUserSql, (err, result) => {
            if (err) {
                res.status(500).send();
            } else {
                const Exists = Boolean(result.length);
                if (!Exists) {
                    res.status(404).send();
                } else {
                    next();
                }
            }
        });
    }
};

const editUser = (req, res, next) => {
    const ID = req.body.ID;
    let fields = "";
    for (let [key, value] of Object.entries(req.body)) {
        if (key == "ID") continue;
        if (fields === "") {
            fields += `${key} = '${value}'`;
        } else {
            fields += `, ${key} = '${value}'`;
        }
    }
    const editUserSql = `UPDATE User SET ${fields} WHERE ID = ${ID}`;
    dbConnect.query(editUserSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            console.log(`Edited`);
            res.status(200).send();
        }
    });
};

const deleteUser = (req, res, next) => {
    const ID = req.body.ID;
    const deleteUserSql = `DELETE FROM User WHERE ID = ${ID}`;
    dbConnect.query(deleteUserSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            console.log(`Deleted User Detailes with ID = ${ID}`);
            res.status(200).send();
        }
    });
};

const isUser = (req, res, next) => {
    const { Name, Email, Password } = req.body;
    if (!Name || !Email || !Password) {
        res.status(406).send("Invalid Credentials");
    } else {
        const isUserSql = `SELECT ID FROM User
        WHERE (Name, Email, Password) = ('${Name}', '${Email}', '${Password}')`;
        dbConnect.query(isUserSql, (err, result) => {
            if (err) {
                res.status(500).send();
            } else {
                const Exists = Boolean(result.length);
                if (Exists) {
                    req.ID = result[0].ID;
                    next()
                } else {
                    res.status(400).send();
                }
            }
        });
    }
};


// User Dashboard (Validate)
const getDashboard = (req, res, next) => {
    const { ID, Name } = req.payload;
    let condition = '';
    if(!ID) {
        res.status(400).send();
    } else {
        condition = `Where u.ID = ${ID}`;
    }
    const getDashboardSql = `
    SELECT DISTINCT v.Name as Vehicle, v.Type 
    FROM  Vehicle as v
    LEFT JOIN VehicleRegistration as vr ON vr.VehicleID = v.ID
    LEFT JOIN User as u ON vr.UserID = u.ID
    ${condition}`;
    dbConnect.query(getDashboardSql, (err, result) => {
        if (err) {
            res.status(500).json(err).send();
        } else {
            const Exists = Boolean(result.length);
            if (Exists) {
                res.status(200).json({Name: Name, My_Vehicle: result}).send();
            } else {
                res.status(404).json({Name: Name, My_Vehicle: "No Records Found!"}).send();
            }
        }
    });
};


module.exports = {
    getUser, 
    avoidDuplicateUser, 
    addUser, 
    inUser, 
    editUser, 
    deleteUser,
    isUser,
    getDashboard
};