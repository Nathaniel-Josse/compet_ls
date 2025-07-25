const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, person, surface, heating_system } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ name, email, password, createdAt: new Date() });
        await user.save();

        // We get the user Id out of the user objectId
        const userIdString = user._id.toString();

        const statRes = await fetch(`${process.env.PUBLIC_BACKEND_PATH}/api/stats/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userIdString, person: person, surface: surface, heating_system: heating_system }),
        });

        res.status(201).json({ message: `User registered successfully. If you want to return to the register page: ${process.env.PUBLIC_BACKEND_PATH}/signup-page`, email: user.email, createdAt: user.createdAt });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user ||!(await user.comparePassword(password))) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, refreshToken, userId: user._id });
});

router.get('/refresh-token', async (req, res) => {
    const refreshToken = req.headers.authorization?.split(' ')[1];

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const token = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(403).json({ message: 'Token de rafraichissement incorrect ou expiré' });
    }
});


router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('email name createdAt');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user_id: decoded.userId, name: user.name, email: user.email});
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        console.error('Token verification error:', error);
    }
});

module.exports = router;