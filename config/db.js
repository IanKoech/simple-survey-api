const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:iankoech@localhost:5432/sky_survey_db');

module.exports = db;