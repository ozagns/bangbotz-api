const express = require('express');
const router = express.Router();
const config = require('../../config');
const merdekaData = require('./data/merdeka.json'); 

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * merdekaData.length);
        const result = merdekaData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: result.pertanyaan,
                jawaban: result.jawaban
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat kuis merdeka" 
        });
    }
});

module.exports = router;