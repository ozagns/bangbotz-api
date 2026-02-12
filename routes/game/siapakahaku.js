const express = require('express');
const router = express.Router();
const config = require('../../config');
const siapakahData = require('./data/siapakahaku.json'); 

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * siapakahData.length);
        const result = siapakahData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: result.soal || result.pertanyaan, // Handle jika ada perbedaan key
                jawaban: result.jawaban
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat soal Siapakah Aku" 
        });
    }
});

module.exports = router;