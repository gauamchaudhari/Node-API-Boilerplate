const multer = require('multer');
const path = require('path');
const fs = require('fs');

const tempUploadPath = path.join(__dirname, '..', 'uploads', 'temp');

fs.mkdirSync(tempUploadPath, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempUploadPath); // upload to temp folder first
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

class ImageUpload {
    constructor() {
        this.upload = multer({ 
            storage,
            limits: { fileSize: 5 * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                const fileTypes = /jpeg|jpg|png|gif/;
                const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
                const mimetype = fileTypes.test(file.mimetype);

                if (mimetype && extname) {
                    return cb(null, true);
                } else {
                    cb(new Error('Only image files are allowed'));
                }
            }
        });
    }

    uploadSingleImage() {
        return this.upload.single('image');
    }
}

module.exports = ImageUpload;
