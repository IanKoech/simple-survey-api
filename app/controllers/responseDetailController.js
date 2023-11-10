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
    },

    updateResponseDetail: async (req, res) => {
        const responseDetailId = req.params.id;
        const { question_id, response_id, response } = req.body;
        try {
          await db.none(
            "UPDATE response_detail SET question_id=$1, response_id=$2, response=$3 WHERE response_detail_id=$4",
            [question_id, response_id, response, responseDetailId]
          );
          res.json({ message: "Response Detail updated" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      },
    
      deleteResponseDetail: async (req, res) => {
        const responseDetailId = req.params.id;
        try {
          await db.none("DELETE FROM response_detail WHERE response_detail_id = $1", [responseDetailId]);
          res.json({ message: "Response Detail deleted" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }

};

module.exports = responseDetailController;