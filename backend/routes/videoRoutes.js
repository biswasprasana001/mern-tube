// backend\routes\videoRoutes.js
const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const parser = require('../uploadMiddleware');

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', parser.single('video'), async (req, res) => {
    const video = new Video({
        title: req.body.title,
        description: req.body.description,
        url: req.file.path,
    });

    try {
        const newVideo = await video.save();
        res.status(201).json(newVideo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;