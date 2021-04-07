'use strict';

const { dbConnect } = require('../config/db.config');



// Vehicle List Operations

const getVehicleListByUser = (req, res, next) => {
    const userName = req.query.Name;
    let condition = '';
    if (userName === undefined) {
        condition = '';
    } else {
        condition = `WHERE u.Name = '${userName}'`;
    }

    const getVehicleListByUserSql = 'SELECT DISTINCT '+
                                    ' u.ID as User_ID, u.Name as User_Name,'+
                                    ' v.Name as Vehicle_Name, v.Type as Vehicle_Type,'+
                                    ' vr.RegistrationDate, vr.ExpiryDate'+
                                    ' FROM Vehicle as v'+
                                    ' Right JOIN VehicleRegistration as vr'+
                                    ' ON v.ID = vr.VehicleID'+
                                    ' Left JOIN User as u'+
                                    ' ON u.ID = vr.UserID'+
                                    ` ${condition} `;
    
    dbConnect.query(getVehicleListByUserSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            const Exits = Boolean(result.length);
            
            if (Exits) {
                console.log('Fetched VehicleList Successfully');
                res.status(200).send(result);
            } else {
                console.log('VehicleList Not Found');
                res.status(404).send();
            }
        }
    });
    
};


const getVehicleListByState = (req, res, next) => {
    const stateName = req.query.State;
    let condition = '';
    if (stateName === undefined) {
        condition = '';
    } else {
        condition = `WHERE s.StateName = '${stateName}'`;
    }

    const getVehicleListByStateSql = 'SELECT DISTINCT '+
                                    ' s.ID as State_ID, s.StateName as State_Name,'+
                                    ' v.Name as Vehicle_Name, v.Type as Vehicle_Type,'+
                                    ' vr.RegistrationDate, vr.ExpiryDate'+
                                    ' FROM Vehicle as v'+
                                    ' Right JOIN VehicleRegistration as vr'+
                                    ' ON v.ID = vr.VehicleID'+
                                    ' Left JOIN User as u'+
                                    ' ON u.ID = vr.UserID'+
                                    ' Left JOIN States as s'+
                                    ' ON s.ID = u.StateID'+
                                    ` ${condition} `;
    
    dbConnect.query(getVehicleListByStateSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            const Exits = Boolean(result.length);
            
            if (Exits) {
                console.log('Fetched VehicleList Successfully');
                res.status(200).send(result);
            } else {
                console.log('VehicleList Not Found');
                res.status(404).send();
            }
        }
    });
    
};




module.exports = {
    getVehicleListByUser,
    getVehicleListByState
};