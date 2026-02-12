const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/', (req, res) => {
    try {
        const categories = ['arithmetic', 'power', 'trigonometry'];
        const category = categories[Math.floor(Math.random() * categories.length)];
        
        let soal, jawaban;

        if (category === 'trigonometry') {
            const trigos = ['sin', 'cos', 'tan'];
            const angles = [0, 30, 45, 60, 90];
            const chosenTrigo = trigos[Math.floor(Math.random() * trigos.length)];
            const chosenAngle = angles[Math.floor(Math.random() * angles.length)];
            
            soal = `Berapakah nilai dari ${chosenTrigo}(${chosenAngle}°) ?`;
            
            const table = {
                'sin': { 0: '0', 30: '1/2', 45: '1/2√2', 60: '1/2√3', 90: '1' },
                'cos': { 0: '1', 30: '1/2√3', 45: '1/2√2', 60: '1/2', 90: '0' },
                'tan': { 0: '0', 30: '1/3√3', 45: '1', 60: '√3', 90: 'Tak Terhingga' }
            };
            jawaban = table[chosenTrigo][chosenAngle];

        } else if (category === 'power') {
            const base = Math.floor(Math.random() * 15) + 2;
            const exp = Math.floor(Math.random() * 3) + 2;
            soal = `${base} ^ ${exp}`;
            jawaban = String(Math.pow(base, exp));

        } else {
            const n1 = Math.floor(Math.random() * 100) + 10;
            const n2 = Math.floor(Math.random() * 50) + 5;
            soal = `${n1} * ${n2}`;
            jawaban = String(n1 * n2);
        }

        res.json({
            status: true,
            creator: config.creator,
            result: {
                soal: soal,
                jawaban: jawaban,
                level: "Math v2 (Advanced)"
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal memproses soal Math v2" 
        });
    }
});

module.exports = router;