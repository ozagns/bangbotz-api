const express = require('express');
const router = express.Router();
const config = require('../../config');
const jenakaData = require('./data/tebakjenaka.json');

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * jenakaData.length);
        const result = jenakaData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: result.soal,
                jawaban: result.jawaban
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat tebakan jenaka" 
        });
    }
});

module.exports = router;