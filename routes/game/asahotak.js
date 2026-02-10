const express = require('express');
const router = express.Router();
const path = require('path'); // Gunakan library path bawaan Node.js
const config = require('../../config');

router.get('/', (req, res) => {
    try {
        // Menggunakan path.join agar lokasi file ditemukan dengan pasti di server
        const soalPath = path.join(__dirname, '../../data/asahotak.json');
        const soalData = require(soalPath);

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
        res.status(500).json({ 
            status: false, 
            error: e.message, // Menampilkan pesan error spesifik jika gagal lagi
            tip: "Pastikan folder 'data' dan file 'asahotak.json' sudah di-push ke GitHub"
        });
    }
});

module.exports = router;