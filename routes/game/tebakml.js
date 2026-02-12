const express = require('express');
const router = express.Router();
const config = require('../../config');
const mlData = require('./data/tebakml.json');

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * mlData.length);
        const result = mlData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                img: result.img,
                full_image: result.fullimg, // Link gambar utuh
                jawaban: result.jawaban,
                clue: result.deskripsi
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat kuis hero Mobile Legends" 
        });
    }
});

module.exports = router;