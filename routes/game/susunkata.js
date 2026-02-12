const express = require('express');
const router = express.Router();
const config = require('../../config');
const susunData = require('./data/susunkata.json');

// Fungsi untuk mengacak string (Shuffle)
function shuffle(string) {
    let array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

router.get('/', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * susunData.length);
        const item = susunData[randomIndex];
        
        // Pastikan hasil acak tidak sama dengan kata asli
        let acak = shuffle(item.jawaban);
        while (acak === item.jawaban) {
            acak = shuffle(item.jawaban);
        }

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: acak,
                jawaban: item.jawaban,
                clue: item.tipe
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memuat game Susun Kata" 
        });
    }
});

module.exports = router;