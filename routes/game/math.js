const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/', (req, res) => {
    try {
        const operators = ['+', '-', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        
        // Menghasilkan angka acak 1-50
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        
        let soal = `${num1} ${operator} ${num2}`;
        let jawaban = eval(soal); // Menghitung hasil otomatis

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: soal,
                jawaban: String(jawaban)
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal menghasilkan soal matematika" 
        });
    }
});

module.exports = router;