const db = require('../../config/db');

const questionController = {
    getAllQuestions: async (req, res) => {
        try {
            const questions = await db.any('SELECT * FROM  question');
            res.json(questions);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' })
        }
    },

    createQuestion: async(req, res) => {
        const { name, type, required, text, description } = req.body;
        try {
            await db.none('INSERT INTO question(name, type, required, text, description) VALUES ($1, $2, $3, $4, $5)', 
            [
                name,
                type,
                required,
                text, 
                description
            ]);
            res.json({ message: 'Question created successfully' })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
};

module.exports = questionController;