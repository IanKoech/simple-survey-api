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
                    responseId,
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
    },
    updateFile: async (req, res) => {
        const fileId = req.params.id;
        const { response_id, file_name, format, file_size } = req.body;
        try {
            await db.none(
                "UPDATE file SET response_id=$1, file_name=$2, format=$3, file_size=$4 WHERE file_id=$5",
                [
                    response_id,
                    file_name,
                    format,
                    file_size,
                    fileId
                ]
            );
            res.json({ message: "File update successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    deleteFile: async (req, res) => {
        const fileId = req.params.id;
        try {
            await db.none("DELETE FROM file WHERE file_id = $1", [fileId]);
            res.json({ message: 'File deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = fileController;