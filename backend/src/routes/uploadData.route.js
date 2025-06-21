const express = require('express');

const router = express.Router();

const { uploadData } = require('../controllers/uploadData.controller.js');

router.post('/upload-data', uploadData);

module.exports = router;
