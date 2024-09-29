const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
class ImageUpload {
    constructor() {
        this.upload = multer({ 
            storage: storage,
            limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
            fileFilter: (req, file, cb) => {
                // Validate file type
                const fileTypes = /jpeg|jpg|png|gif/;
                const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
                const mimetype = fileTypes.test(file.mimetype);
                
                if (mimetype && extname) {
                    return cb(null, true);
                } else {
                    cb(new Error('Only images are allowed'));
                }
            }
        });
    }

    // Method to handle single image upload
    uploadSingleImage() {
        return this.upload.single('image');
    }
}

module.exports = ImageUpload;
