const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

router.get('/api/surveys', surveyController.getAllSurveys);
router.post('/api/surveys', surveyController.createSurvey);

module.exports = router;