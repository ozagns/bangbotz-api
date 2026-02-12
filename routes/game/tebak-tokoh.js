const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Game Tebak Tokoh (General/Nasional)
 * @author BangBotz / ozagns
 */

router.get('/', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data', 'tebaktokoh.json');
        const rawData = fs.readFileSync(dataPath);
        const daftarTokoh = JSON.parse(rawData);

        // Ambil secara acak
        const pick = daftarTokoh[Math.floor(Math.random() * daftarTokoh.length)];

        res.json({
            status: true,
            creator: config.creator,
            result: {
                image: pick.img,
                soal: "Siapakah nama tokoh pada gambar tersebut?",
                deskripsi: pick.deskripsi,
                jawaban: pick.jawaban,
                clue: `Huruf Depan: ${pick.jawaban.charAt(0)} | Jumlah: ${pick.jawaban.length} Karakter`
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memuat database tebak tokoh."
        });
    }
});

module.exports = router;