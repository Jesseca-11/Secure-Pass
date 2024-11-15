const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `dispute_${Date.now()}_${file.originalname}`);
    }
});

// Initialize upload
const uploadImage = multer({
    storage,
    limits: {fileSize: 9000000},
    fileFilter: (request, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
})

module.exports = uploadImage;
