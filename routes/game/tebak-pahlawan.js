const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Game Tebak Pahlawan
 * @author BangBotz / ozagns
 */

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebakpahlawan.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarPahlawan = JSON.parse(rawData);

        // Ambil secara acak
        const pick = daftarPahlawan[Math.floor(Math.random() * daftarPahlawan.length)];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                image: pick.img,
                soal: "Siapakah nama pahlawan nasional pada gambar tersebut?",
                deskripsi: pick.deskripsi,
                jawaban: pick.jawaban,
                clue: `Awalan: ${pick.jawaban.charAt(0)} | Total: ${pick.jawaban.length} Karakter`
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database tebak pahlawan."
        });
    }
});

module.exports = router;