const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Game Tebak Kode (Multi-Language)
 * @author BangBotz / ozagns
 */

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebakkode.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarKode = JSON.parse(rawData);

        // Ambil soal secara acak
        const pick = daftarKode[Math.floor(Math.random() * daftarKode.length)];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                bahasa: pick.bahasa || "Umum",
                soal: pick.soal,
                pilihan: pick.pilihan,
                jawaban: pick.jawaban,
                deskripsi: pick.deskripsi
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database tebak kode."
        });
    }
});

module.exports = router;