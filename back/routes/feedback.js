const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/add', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { object, content} = req.body;
    if (!object || !content) {
        return res.status(400).json({ message: 'user_id, object and content are required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const feedback = new Feedback({
            user_id: decoded.userId,
            object,
            content
        });
        await feedback.save();
        res.status(201).json({ message: 'Feedback added successfully', feedback });
    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;