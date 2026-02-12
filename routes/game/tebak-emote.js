const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Game Tebak Emote (Emoji Based)
 * @author BangBotz / ozagns
 */

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebakemote.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarEmote = JSON.parse(rawData);

        // Ambil soal secara acak
        const pick = daftarEmote[Math.floor(Math.random() * daftarEmote.length)];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: pick.soal,
                emote: pick.emoticon,
                jawaban: pick.jawaban,
                petunjuk: pick.deskripsi
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database tebak emote."
        });
    }
});

module.exports = router;