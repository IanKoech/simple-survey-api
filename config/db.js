const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:iankoech@localhost:5432/sky_survey_db');

db.connect()
    .then(obj => {
        console.log('Database connection successful');
        obj.done(); //releases the db connection
    })
    .catch(errror => {
        console.log('Error connecting to the database :', error);
    });
    
module.exports = db;