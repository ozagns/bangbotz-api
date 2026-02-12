const express = require('express');
const router = express.Router();
const config = require('../../config');
const benderaData = require('./data/tebakbendera.json');

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * benderaData.length);
        const result = benderaData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                img: result.img,
                jawaban: result.jawaban
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat kuis tebak bendera" 
        });
    }
});

module.exports = router;