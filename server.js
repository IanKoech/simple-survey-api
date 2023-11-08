const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());

const surveyRoutes = require('./app/routes/surveyRoutes');

app.use('/', surveyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})