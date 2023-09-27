// backend\routes\videoRoutes.js
const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { parser, cloudinary } = require('../uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find().populate('uploader', 'username');
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', authMiddleware, parser.single('video'), async (req, res) => {
    console.log(req.file);
    try {
        const video = new Video({
            title: req.body.title,
            description: req.body.description,
            url: req.file.path,
            uploader: req.userData.userId,
            cloudinary_id: req.file.filename,
        });

        const newVideo = await video.save();
        res.status(201).json(newVideo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (video.uploader.toString() !== req.userData.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Remove video from Cloudinary
        // You can use the public ID stored in your database instead of extracting it from the URL
        try {
            // Await for the destroy operation to complete
            const result = await cloudinary.uploader.destroy(video.cloudinary_id, { resource_type: 'video' });
            // Check if the destroy was successful
            if (result && result.result === 'ok') {
                // The video was destroyed successfully
                await Video.findByIdAndDelete(req.params.id);
                res.json({ message: 'Video deleted' });
                console.log('The video was destroyed successfully');
            } else {
                // There was an error destroying the video
                console.error('There was an error destroying the video:', result);
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error('There was an unexpected error:', error);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const videos = await Video.find({ uploader: req.params.userId }).populate('uploader', 'username');
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:id/like', authMiddleware, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        const index = video.likes.indexOf(req.userData.userId);
        if (index === -1) {
            video.likes.push(req.userData.userId);
        } else {
            video.likes.splice(index, 1);
        }
        await video.save();
        res.json({likes: video.likes});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        video.comments.push({ userId: req.userData.userId, username: req.body.username, comment: req.body.comment });
        await video.save();
        res.json({ message: 'Comment added' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;