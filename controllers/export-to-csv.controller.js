'use strict';

const { dbConnect } = require('../config/db.config');
const {
    saveCsv
} = require('../helper/save-csv.helper');



// Export CSV Operation
const exportCsv = (req, res, next) => {
    const status = req.query.Active;
    let condition = '';
    if (status === undefined || status === null) {
        condition = '';
    } else {
        condition = `WHERE u.Status = ${status}`;
    }

    const exportCsvSql = 'SELECT DISTINCT '+
                            ' u.Name as User_Name, u.Email,'+
                            ' v.Name as Vehicle, vr.RegistrationDate, vr.ExpiryDate'+
                            ' FROM User as u'+
                            ' Left JOIN VehicleRegistration as vr'+
                            ' ON u.ID = vr.UserID'+
                            ' Left JOIN Vehicle as v'+
                            ' ON v.ID = vr.VehicleID'+
                            ` ${condition}`;

    dbConnect.query(exportCsvSql, (err, result) => {
        if (err) {
            throw err;
            // res.status(500).send();
        } else {
            const Exists = Boolean(result.length);

            if (Exists) {
                const parameters = {
                    res: res,
                    data: result,
                    filePath: "public/user-data.csv"
                };

                saveCsv(parameters);

            } else {
                console.log('No such Record found');
                res.status(404).send();
            }
        }
    });
};




module.exports = {
    exportCsv
};