const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Game Tebak Kata (Data Driven)
 * @author BangBotz / ozagns
 */

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebakkata.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarKata = JSON.parse(rawData);

        // Ambil soal secara acak
        const pick = daftarKata[Math.floor(Math.random() * daftarKata.length)];

        // Normalisasi jawaban (Uppercase & Trim)
        const jawabanFinal = pick.jawaban.trim().toUpperCase();

        res.json({
            status: true,
            creator: config.creator,
            result: {
                index: pick.index,
                soal: pick.soal,
                jawaban: jawabanFinal,
                clue: `Huruf pertama: ${jawabanFinal.charAt(0)} | Panjang kata: ${jawabanFinal.length} karakter`
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database tebak kata."
        });
    }
});

module.exports = router;