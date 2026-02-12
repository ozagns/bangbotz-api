const express = require('express');
const router = express.Router();
const config = require('../../config');
const familyData = require('./data/family100.json'); // Pastikan path benar

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * familyData.length);
        const result = familyData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: result.soal,
                jawaban: result.jawaban // Ini akan berupa array
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat soal Family 100" 
        });
    }
});

module.exports = router;