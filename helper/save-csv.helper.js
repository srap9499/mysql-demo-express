'use strict'

const fileSystem = require('fs');
const fastCsv = require('fast-csv');

// Save Csv
const saveCsv = ({res, data, filePath}) => {
    let error = 0;
    if (!filePath) {
        res.status(500).send('File Path not provided')
    } else if(filePath.slice(-4,).toLowerCase() !== '.csv') {
        res.status(500).send('Invalid extension!');
    } else {
        const file = fileSystem.createWriteStream(filePath).on('error', () => {
            error = 1;
            console.log('Hello I am Error Here');
        });
        setTimeout(() => {
            if (error) {
                res.status(500).send('Directory Not Found!');
            } else {
                fastCsv
                    .write(data, {headers: true})
                    .on('finish', () => {
                        console.log('Write Data Successful');
                    })
                    .pipe(file)
                    .on('error', () => {
                        error = 1;
                        console.log('File Error');
                    });
                setTimeout(() => {
                    if (error) {
                        res.status(500).send('File Error');
                    } else {
                        console.log('Response Sent');
                        res.status(200).send('Exported Successful');
                    }
                }, 20);            
            }
        }, 20)
    }
};



module.exports = {
    saveCsv
};