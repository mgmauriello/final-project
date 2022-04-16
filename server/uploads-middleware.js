const path = require('path');
const multer = require('multer');

const soundsDirectory = path.join(__dirname, 'public/sounds');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, soundsDirectory);
  },
  filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

const uploadsMiddleware = multer({ storage }).single('audio');

module.exports = uploadsMiddleware;
