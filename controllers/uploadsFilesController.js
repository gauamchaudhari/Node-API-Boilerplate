const multer = require('multer');
const ImageUpload = require('../services/ImageUpload');
const UserFiles = require('../models/UserFiles');
const path = require('path');
const fs = require('fs');


const imageUpload = new ImageUpload();

exports.uploadSingleImage = (req, res) => {
    const upload = imageUpload.uploadSingleImage();

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Multer error', message: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Server error', message: err.message });
        }

        const userId = req.body.user_id;
        if (!userId) {
            return res.status(400).json({ error: 'user_id is required in form-data' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const userDir = path.join(__dirname, '..', 'uploads', userId);
        fs.mkdirSync(userDir, { recursive: true });

        const newFilePath = path.join(userDir, req.file.filename);

        // Move file from temp to user folder
        fs.renameSync(req.file.path, newFilePath);

        const fileData = {
            user_id: userId,
            file_path: path.relative(path.join(__dirname, '..'), newFilePath),
            file_type: req.file.mimetype,
        };
        console.log('File data:', fileData);
        UserFiles.storeFiles(fileData, (err, insertedId) => {
            if (err) {
                return res.status(500).json({ error: 'Database error', message: err });
            }

            res.status(200).json({
                message: 'File uploaded and saved to DB successfully',
                file_id: insertedId,
                ...fileData
            });
        });
    });
}


exports.getFilesByUserId = (req, res) => {
    const userId = req.params.user_id;
    if (!userId) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    UserFiles.getByFilesByUserId(userId, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', message: err });
        }
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const filteredFiles = files.map(file => ({
            file_path: `${baseUrl}/${file.file_path}`,
            file_type: file.file_type,
            user_id: file.user_id,
            created_at: file.created_at
        }));
        res.status(200).json({ status: 200, data: filteredFiles });
    });
}




