const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/api/questions', questionController.getAllQuestions);
router.post('/api/questions', questionController.createQuestion);
