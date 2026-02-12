// E:\bangbotz-api\routes\game\tebak-makanan.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebakmakanan.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarMakanan = JSON.parse(rawData);

        const pick = daftarMakanan[Math.floor(Math.random() * daftarMakanan.length)];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                image: pick.img,
                soal: pick.deskripsi, // Menggunakan deskripsi asal daerah sebagai soal
                jawaban: pick.jawaban,
                clue: `Awalan: ${pick.jawaban.charAt(0)} | Total: ${pick.jawaban.length} Karakter`
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database kuliner nusantara."
        });
    }
});

module.exports = router;