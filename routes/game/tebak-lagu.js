const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Game Tebak Lagu (Audio Based)
 * @author BangBotz
 */

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebaklagu.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarLagu = JSON.parse(rawData);

        // Ambil lagu secara acak
        const pick = daftarLagu[Math.floor(Math.random() * daftarLagu.length)];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                audio: pick.lagu,
                jawaban: pick.judul,
                artis: pick.artis,
                clue: `Penyanyi: ${pick.artis} | Huruf depan: ${pick.judul.charAt(0)}`
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database lagu."
        });
    }
});

module.exports = router;