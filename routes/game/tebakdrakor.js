const express = require('express');
const router = express.Router();
const config = require('../../config');
const drakorData = require('./data/tebakdrakor.json');

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * drakorData.length);
        const result = drakorData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                img: result.img,
                jawaban: result.jawaban,
                tahun: result["tahun rilis"], // Mengambil key dengan spasi
                hint: result.deskripsi,
                clue: `Drama ini rilis tahun ${result["tahun rilis"]}`
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memproses data kuis drakor" 
        });
    }
});

module.exports = router;