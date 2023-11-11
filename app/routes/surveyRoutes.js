const express = require('express');
const router = express.Router();

const db = require('../../config/db');

const surveyController = require('../controllers/surveyController');
const responseController = require('../controllers/responseController');
const fileController = require('../controllers/fileController');
const questionController = require('../controllers/questionController');
const responseDetailController = require('../controllers/responseDetailController');

router.get('/api/surveys', surveyController.getAllSurveys);
router.post('/api/surveys', surveyController.createSurvey);

router.get('/api/files', fileController.getAllFiles);
router.post('/api/files', fileController.createFile);
router.put('/api/files/:id', fileController.updateFile);
router.delete('/api/files/:id', fileController.deleteFile);

router.get('/api/questions', questionController.getAllQuestions);
router.post('/api/questions', questionController.createQuestion);
router.put('/api/questions/:id', questionController.updateQuestion);
router.delete('/api/questions/:id', questionController.deleteQuestion);

router.get('/api/responses', responseController.getAllResponses);
router.post('/api/responses', responseController.submitResponse);
router.post('/api/responses/:id', responseController.updateResponse);
router.post('/api/response/:id', responseController.deleteResponse);

router.get('/api/responses/surveys/survey:survey_id', responseController.getResponsesBySurvey);
router.get('/api/responses/certificates/:id', responseController.downloadCertificate);

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