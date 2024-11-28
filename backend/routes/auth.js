const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Registrierung
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send('Benutzer existiert bereits.');

        const user = new User({ email, password });
        await user.save();

        res.status(201).send('Benutzer registriert.');
    } catch (err) {
        res.status(500).send('Fehler bei der Registrierung.');
    }
});

// LoginPage
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Benutzer nicht gefunden.');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send('Ungültiges Passwort.');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Fehler beim LoginPage.');
    }
});

module.exports = router;
