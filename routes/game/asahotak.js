const express = require('express');
const router = express.Router();
const config = require('../../config');
// Panggil langsung dari sub-folder 'data' di lokasi yang sama 🕑
const soalData = require('./data/asahotak.json'); 

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * soalData.length);
        const result = soalData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: result.pertanyaan,
                jawaban: result.jawaban,
                index: randomIndex + 1,
                total_soal: soalData.length
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat data soal 🕑" 
        });
    }
});

module.exports = router;