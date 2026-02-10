const express = require('express');
const router = express.Router();
const config = require('../../config');
const soalData = require('../../data/asahotak.json'); // Mengambil bank soal

router.get('/', (req, res) => {
    try {
        // Logika memilih 1 data secara acak dari total soal yang ada
        const randomIndex = Math.floor(Math.random() * soalData.length);
        const result = soalData[randomIndex];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: result.pertanyaan,
                jawaban: result.jawaban,
                index: randomIndex + 1, // Memberitahu ini soal ke berapa
                total_soal: soalData.length
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal mengambil soal asah otak" 
        });
    }
});

module.exports = router;