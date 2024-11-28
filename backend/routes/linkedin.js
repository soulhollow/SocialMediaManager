const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/auth', (req, res) => {
    const redirectUri = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=http://localhost:3000/api/linkedin/callback&scope=r_liteprofile%20r_emailaddress`;
    res.redirect(redirectUri);
});

router.get('/callback', async (req, res) => {
    try {
        const code = req.query.code;

        // Tausche den Code gegen ein Access Token
        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:3000/api/linkedin/callback',
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            },
        });

        const accessToken = tokenResponse.data.access_token;

        // Hole Profildaten
        const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        res.json(profileResponse.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Fehler bei LinkedIn OAuth.');
    }
});

module.exports = router;
