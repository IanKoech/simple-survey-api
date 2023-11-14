const db = require('../../config/db');

const responseController = {
    getAllResponses: async (req, res) => {
       try {
            const { email } = req.query; // Extract email from query parameters
            let responses;
            if (email) {
                // If email is provided, filter responses by email
                responses = await db.any('SELECT * FROM response WHERE email_address = $1', [email]);
            } else {
                // If no email provided, get all responses
                responses = await db.any('SELECT * FROM response');
            }
            res.json(responses);
       } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
       }
    },

    submitResponse: async (req, res) => {
        console.log(req.body); // Log the request body
        const { survey_id, full_name, email_address, description, gender } = req.body;
  
        try {
            const date_responded = new Date();
            const response = await db.one('INSERT INTO response(survey_id, full_name, email_address, description, gender, date_responded) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [
                survey_id,
                full_name,
                email_address,
                description, 
                gender,
                date_responded
            ]);
  
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' })
        }
    },
  
    getResponsesBySurvey: async (req, res) => {
        const { survey_id } = req.params;

        try {
            const responses = await db.any('SELECT * FROM response WHERE survey_id = $1', [survey_id]);
            res.json(responses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    downloadCertificate: async (req, res) => {
        const { id } = req.params;
        try {
            const certificate = await downloadCertificatebyId(id);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="certificate_${id}.pdf"`);
      
            res.send(certificate);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateResponse: async (req, res) => {
        const responseId = req.params.id;
        const { survey_id, full_name, email_address, description, gender } = req.body;
        try {
            await db.none(
                "UPDATE response SET survey_id=$1, full_name=$2, email_address=$3, description=$4, gender=$5 WHERE response_id=$6",
                [survey_id, full_name, email_address, description, gender, responseId]
            );
            res.json({ message: "Response updated" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
  
    deleteResponse: async (req, res) => {
        const responseId = req.params.id;
        try {
            await db.none("DELETE FROM response WHERE response_id = $1", [responseId]);
            res.json({ message: "Response deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = responseController;