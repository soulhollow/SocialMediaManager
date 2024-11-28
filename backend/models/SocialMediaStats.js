const mongoose = require('mongoose');

const socialMediaStatsSchema = new mongoose.Schema({
    platform: { type: String, required: true },
    followers: { type: Number, required: true },
    likes: { type: Number, required: true },
    shares: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SocialMediaStats', socialMediaStatsSchema);
