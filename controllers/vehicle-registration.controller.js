'use strict';

const { dbConnect } = require('../config/db.config');



// VehicleRegistration Operations

const getVehicleRegistration = (req, res, next) => {
    
    const getVehicleRegistrationSql = 'SELECT * FROM VehicleRegistration';
    dbConnect.query(getVehicleRegistrationSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            const Exits = Boolean(result.length);
            
            if (Exits) {
                console.log('Selected Successfully');            
                res.status(200).send(result);
            } else {
                console.log('No Vehicle Registration Found');
                res.status(404).send();
            }
        }
    });

};
const avoidDuplicateVehicleRegistration = (req, res, next) => {
    const UserID = req.body.UserID;
    const VehicleID = req.body.VehicleID;
    const RegistrationDate = req.body.RegistrationDate;
    const ExpiryDate = req.body.ExpiryDate;
    
    if (!UserID || !VehicleID || !RegistrationDate || !ExpiryDate) {
        res.status(406).send();   
    } else {
        const avoidDuplicateVehicleRegistrationSql = `SELECT * FROM VehicleRegistration where (UserID, VehicleID, RegistrationDate, ExpiryDate) = (${UserID}, ${VehicleID}, '${RegistrationDate}', '${ExpiryDate}')`;
        
        dbConnect.query(avoidDuplicateVehicleRegistrationSql, (err, result) => {
            if (err) {
                res.status(500).send();
            } else {
                const Exits = Boolean(result.length);
            
                if (Exits) {
                    res.status(208).send();
                } else {
                    next();
                }
            }
        });
    }
};
const addVehicleRegistration = (req, res, next) => {
    const UserID = req.body.UserID;
    const VehicleID = req.body.VehicleID;
    const RegistrationDate = req.body.RegistrationDate;
    const ExpiryDate = req.body.ExpiryDate;
    
    const addVehicleRegistrationSql = `INSERT INTO VehicleRegistration (UserID, VehicleID, RegistrationDate, ExpiryDate) VALUES (${UserID}, ${VehicleID}, '${RegistrationDate}', '${ExpiryDate}')`;
    
    dbConnect.query(addVehicleRegistrationSql, (err) => {
        if (err) {
            res.status(500).send();
        } else {
            console.log('Inserted Successfully');
            res.status(200).send();
        }
    });
};

const inVehicleRegistration = (req, res, next) => {
    const ID = req.body.ID;
    
    if (!ID) {
        res.status(406).send();
    } else {

        const inVehicleRegistrationSql = `SELECT * FROM VehicleRegistration where ID = ${ID}`;
        
        dbConnect.query(inVehicleRegistrationSql, (err, result) => {
            if (err) {
                res.status(500).send();
            } else {
                const Exits = Boolean(result.length);
            
                if (!Exits) {
                    res.status(404).send();
                } else {
                    next();
                }
            }
        });
    }
};

const editVehicleRegistration = (req, res, next) => {
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

    const editVehicleRegistrationSql = `UPDATE VehicleRegistration SET ${fields} WHERE ID = ${ID}`;

    dbConnect.query(editVehicleRegistrationSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            console.log(`Edited`);
            res.status(200).send();
        }
    });
};

const deleteVehicleRegistration = (req, res, next) => {
    const ID = req.body.ID;

    const deleteVehicleRegistrationSql = `DELETE FROM VehicleRegistration WHERE ID = ${ID}`;

    dbConnect.query(deleteVehicleRegistrationSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            console.log(`Deleted Vehicle Registration Detailes with ID = ${ID}`);
            res.status(200).send();
        }
    });
};





module.exports = {
    getVehicleRegistration, 
    avoidDuplicateVehicleRegistration, 
    addVehicleRegistration, 
    inVehicleRegistration, 
    editVehicleRegistration, 
    deleteVehicleRegistration
};