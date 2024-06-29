const multer = require('multer');
const ImageUpload = require('../services/ImageUpload');

const imageUpload = new ImageUpload();

const uploadSingleImage = (req, res) => {
    const upload = imageUpload.uploadSingleImage();

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Error during file upload', message: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Server error', message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
    });
};

module.exports = { uploadSingleImage };
