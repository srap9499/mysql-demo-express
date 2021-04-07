'use strict';

const { dbConnect } = require('../config/db.config');



// List of User-data, Vehicles, States

const getUserDataList = (req, res, next) => {
    
    const getUserDataListSql = 'SELECT DISTINCT '+
                                ' u.Name as UserName, u.Email, u.Status, v.Name as VehicleName, v.Type, s.StateName'+
                                ' FROM User as u'+
                                ' Right JOIN States as s'+
                                ' ON s.ID = u.StateID'+
                                ' Right JOIN VehicleRegistration as vr'+
                                ' ON u.ID = vr.UserID'+
                                ' Left JOIN Vehicle as v'+
                                ' ON v.ID = vr.VehicleID';

    dbConnect.query(getUserDataListSql, (err, result) => {
        if (err) {
            res.status(500).send();
        } else {
            const Exits = Boolean(result.length);
            
            if (Exits) {
                console.log('Fethed UserDataList Successfull');
                res.status(200).send(result);
            } else {
                console.log('UserDataList Not Found');
                res.status(404).send();
            }
        }
    });
};





module.exports = {
    getUserDataList
};