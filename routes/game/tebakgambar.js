const express = require('express');
const router = express.Router();
const config = require('../../config');
const tebakGambarData = require('./data/tebakgambar.json');

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * tebakGambarData.length);
        const result = tebakGambarData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                index: result.index, // Level dan nomor soal
                img: result.img,
                jawaban: result.jawaban,
                hint: result.deskripsi // Sangat berguna untuk petunjuk bot
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat kuis tebak gambar" 
        });
    }
});

module.exports = router;