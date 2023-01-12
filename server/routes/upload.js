const express = require('express');
const router = express.Router();
const multer = require('multer');

const thumbnailGenerator = require('../helpers/videoThumbnail');
const port = require('../config/default').port;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, '_'));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50    // 50 MB
  }
});

router.post('/', upload.single('file'), (req, res, next) => {
  console.log(req);
  thumbnailGenerator.generateThumbnail(
    'http://localhost:' + port + '/api/videos/' + req.file.filename.replace(/ /g, '_'),
    req.file.filename.replace(/ /g, '_'),
    req.userData.firstName);
  res.status(200).json({
    message: 'Video upload successful'
  });
});

module.exports = router;

