// backend\routes\videoRoutes.js
const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const video = new Video({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
    });

    try {
        const newVideo = await video.save();
        res.status(201).json(newVideo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;