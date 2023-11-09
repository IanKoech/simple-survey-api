const db = require('../../config/db');

const responseDetailController = {
    getAllResponseDetails: async (req, res) => {
        try {
            const responseDetails = await db.any('SELECT * FROM response_detail');
            res.json(responseDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createResponseDetail: async (req, res) => {
        const { question_id, response_id, response } = req.body;
        try {
            const newResponseDetail = await db.one(
                'INSERT INTO response_detail(question_id, response_id, response) VALUES($1, $2, $3) RETURNING *',
                [
                  question_id,
                  response_id,
                  response  
                ]
            );
            
            res.json(newResponseDetail);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = responseDetailController;