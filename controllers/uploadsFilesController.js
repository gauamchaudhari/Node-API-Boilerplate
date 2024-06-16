const multer = require('multer');
const ImageUpload = require('../services/ImageUpload');
// Create an instance of ImageUpload
const imageUpload = new ImageUpload();

// Function to handle single image upload
const uploadSingleImage = (req, res) => {
   console.log("called controller");
    // Use multer middleware to handle single image upload
    imageUpload.uploadSingleImage()(req, res, (err) => {
        // If there's an error during upload
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Error during file upload', message: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Server error', message: err.message });
        }

        // If file is not present in request
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // File upload successful, proceed to next middleware or route handler
        // File upload successful, send response
        res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
        
    });
};

module.exports = { uploadSingleImage };
