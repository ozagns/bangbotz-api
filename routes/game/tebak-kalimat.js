const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebakkalimat.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarKalimat = JSON.parse(rawData);

        const pick = daftarKalimat[Math.floor(Math.random() * daftarKalimat.length)];

        // Kita bersihkan jawaban dari spasi yang nggak sengaja ketulis di JSON
        const jawabanBersih = pick.jawaban.trim();

        res.json({
            status: true,
            creator: config.creator,
            result: {
                index: pick.index,
                soal: pick.soal,
                jawaban: jawabanBersih,
                clue: `Huruf depan: ${jawabanBersih.charAt(0)} | Jumlah huruf: ${jawabanBersih.length}`
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database tebak kalimat."
        });
    }
});

module.exports = router;