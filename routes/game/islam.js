const express = require('express');
const router = express.Router();
const config = require('../../config');
const islamData = require('./data/islam.json'); 

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * islamData.length);
        const result = islamData[randomIndex];

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
            message: "Gagal memuat kuis islami" 
        });
    }
});

module.exports = router;