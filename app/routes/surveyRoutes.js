const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');
const db = require('../../config/db');

router.get('/api/surveys', surveyController.getAllSurveys);
router.post('/api/surveys', surveyController.createSurvey);

//verifying db connection
router.get('/api/checkdb', (req, res) => {
    db.connect()
        .then(() => {
            res.json({ status: 'Database connection successful' });
        })
        .catch(error => {
            console.log('Error connecting to the database ', error);
            res.status(500).json({ status: 'Database connection error' })
        })
})

module.exports = router;