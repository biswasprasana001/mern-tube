// backend\routes\videoRoutes.js
const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

router.get('/', videoController.getAllVideos);
router.post('/upload', videoController.uploadVideo);
router.get('/:id', videoController.getVideoById);

module.exports = router;