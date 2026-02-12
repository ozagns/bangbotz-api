const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Game Tebak Kimia
 * @author BangBotz / ozagns
 */

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebakkimia.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarKimia = JSON.parse(rawData);

        // Ambil unsur secara acak
        const pick = daftarKimia[Math.floor(Math.random() * daftarKimia.length)];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: `Apa nama unsur kimia dengan lambang "${pick.lambang}"?`,
                jawaban: pick.nama,
                nomor_atom: pick.nomor_atom,
                clue: `Nomor atomnya adalah ${pick.nomor_atom}`
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database tebak kimia."
        });
    }
});

module.exports = router;