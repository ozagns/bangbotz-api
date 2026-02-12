const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Game Tebak Logo (Image Based)
 * @author BangBotz / ozagns
 */

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebaklogo.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarLogo = JSON.parse(rawData);

        // Ambil logo secara acak
        const pick = daftarLogo[Math.floor(Math.random() * daftarLogo.length)];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                index: pick.index,
                image: pick.img,
                deskripsi: pick.deskripsi,
                jawaban: pick.jawaban,
                clue: `Jumlah huruf: ${pick.jawaban.length} | Awalan: ${pick.jawaban.charAt(0)}`
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database tebak logo."
        });
    }
});

module.exports = router;