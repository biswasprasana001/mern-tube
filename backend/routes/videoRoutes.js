// backend\routes\videoRoutes.js
const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const parser = require('../uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', authMiddleware, parser.single('video'), async (req, res) => {
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

router.post('/:id/like', authMiddleware, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video.likes.includes(req.userData.userId)) {
            video.likes.push(req.userData.userId);
            await video.save();
        }
        res.json({ message: 'Video liked' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        video.comments.push({ userId: req.userData.userId, comment: req.body.comment });
        await video.save();
        res.json({ message: 'Comment added' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;