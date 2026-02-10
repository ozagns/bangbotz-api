const express = require('express');
const router = express.Router();
const config = require('../../config');
// Panggil langsung karena berada di sub-folder yang sama
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
                jawaban: result.jawaban
            }
        });
    } catch (e) {
        res.status(500).json({ status: false, error: e.message });
    }
});

module.exports = router;