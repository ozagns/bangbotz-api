const express = require('express');
const router = express.Router();
const config = require('../../config');
const animeData = require('./data/tebakanime.json');

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * animeData.length);
        const result = animeData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                img: result.img,
                jawaban: result.jawaban,
                clue: `Karakter dari anime: ${result.anime}` // Memberikan bantuan asal anime 🕑
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat kuis tokoh anime 🕑" 
        });
    }
});

module.exports = router;