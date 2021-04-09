'use strict';

const { dbConnect } = require('../config/db.config');



// Vehicle Operations

const getVehicle = (req, res, next) => {
    const vehicleName = req.query.Name;
    let condition = '';
    if (vehicleName) {
        condition = `WHERE Name = '${vehicleName}'`;
    }
    const getVehicleSql = `SELECT * FROM Vehicle ${condition}`;
    dbConnect.query(getVehicleSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            const Exists = Boolean(result.length);
            if (Exists) {
                console.log('Selected Successfully');
                res.status(200).send(result);
            } else {
                console.log('No Vehicle Found');
                res.status(404).send();
            }
        }
    });
};

const avoidDuplicateVehicle = (req, res, next) => {
    const { Name, Type } = req.body;
    if (!Name || !Type) {
        res.status(406).send();   
    } else {
        const avoidDuplicateVehicleSql = `SELECT * FROM Vehicle
        WHERE (Name, Type) = ('${Name}', '${Type}')`;
        dbConnect.query(avoidDuplicateVehicleSql, (err, result) => {
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

const addVehicle = (req, res, next) => {
    const { Name, Type } = req.body;    
    const addVehicleSql = `INSERT INTO Vehicle
    (Name, Type) 
    VALUES ('${Name}', '${Type}')`;
    dbConnect.query(addVehicleSql, (err) => {
        if (err) {
            res.status(500).send();
        } else {
            console.log('Inserted Successfully');
            res.status(200).send();
        }
    });
};

const inVehicle = (req, res, next) => {
    const ID = req.body.ID;
    if (!ID) {
        res.status(406).send();
    } else {
        const inVehicleSql = `SELECT * FROM Vehicle where ID = ${ID}`;
        dbConnect.query(inVehicleSql, (err, result) => {
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

const editVehicle = (req, res, next) => {
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
    const editVehicleSql = `UPDATE Vehicle SET ${fields} WHERE ID = ${ID}`;
    dbConnect.query(editVehicleSql, (err, result) => {
        if (err) {
            res.status(500).send();
        }
        console.log(`Edited`);
        res.status(200).send();
    });
};

const deleteVehicle = (req, res, next) => {
    const ID = req.body.ID;
    const deleteVehicleSql = `DELETE FROM Vehicle WHERE ID = ${ID}`;
    dbConnect.query(deleteVehicleSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            console.log(`Deleted Vehicle Detailes with ID = ${ID}`);
            res.status(200).send();
        }
    });
};





module.exports = {
    getVehicle, 
    avoidDuplicateVehicle, 
    addVehicle, 
    inVehicle, 
    editVehicle, 
    deleteVehicle
};