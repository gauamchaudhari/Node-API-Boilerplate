const multer = require('multer');

class ImageUpload {
    constructor() {
        // Define the upload directory and file name
        this.upload = multer({ dest: 'uploads/' });
    }

    // Method to handle single image upload
    uploadSingleImage() {
        return this.upload.single('image');
    }
}

module.exports = ImageUpload;
