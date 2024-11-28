const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/profile', async (req, res) => {
    try {
        const response = await axios.get('https://api.twitter.com/2/users/me', {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_API_KEY}`,
            },
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Fehler bei Twitter API.');
    }
});

module.exports = router;
