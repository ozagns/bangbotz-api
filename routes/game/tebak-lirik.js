const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Game Tebak Lirik Rumpang
 * @author BangBotz / ozagns
 */

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebaklirik.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarLirik = JSON.parse(rawData);

        // Ambil secara acak
        const pick = daftarLirik[Math.floor(Math.random() * daftarLirik.length)];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: pick.soal,
                jawaban: pick.jawaban.trim().toLowerCase(),
                judul_lagu: pick.lagu,
                penyanyi: pick.artis,
                clue: `Lirik dari lagu: ${pick.lagu} (${pick.artis})`
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database lirik."
        });
    }
});

module.exports = router;