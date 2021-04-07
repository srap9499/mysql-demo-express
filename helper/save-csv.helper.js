'use strict'

const fileSystem = require('fs');
const fastCsv = require('fast-csv');

// Save Csv
const saveCsv = ({res, data, filePath}) => {
    
    const file = fileSystem.createWriteStream(filePath);
    fastCsv
            .write(data, {headers: true})
            .on('finish', () => {
                res.status(200).send("Successful");
            })
            .pipe(file);
};



module.exports = {
    saveCsv
};