const db = require('../../config/db');

const fileController = {
    getAllFiles: async (req, res) => {
        try {
            const files = await db.any('SELECT * FROM file');
            res.json(files);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createFile: async (req, res) => {
        const { responseId, file_name, format, file_size } = req.body;
        try {
            const newFile = await db.one(
                'INSERT INTO file(response_id, file_name, format, file_size) VALUES($1, $2, $3, $4) RETURNING *',
                [
                    response_id,
                    file_name,
                    format,
                    file_size
                ]
            );
            
            res.json({message: 'File created successfully', file: newFile });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = fileController;