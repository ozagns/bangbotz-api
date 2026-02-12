const express = require('express');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const config = require('../../config');

const router = express.Router();

router.get('/', async (req, res) => {
    const { 
        text, 
        jenis = 'folio', 
        size,     // Kita buat dinamis
        warna = 'black', 
        jarak,    // Jarak baris
        awal      // Posisi atas
    } = req.query;

    if (!text) return res.status(400).json({ status: false, message: "Masukkan teks!" });

    try {
        const canvas = createCanvas(800, 1000);
        const ctx = canvas.getContext('2d');

        // 1. Logika Pemisah Kontrol (Folio vs HVS)
        let configNulis = {
            fontSize: size || (jenis === 'hvs' ? '28' : '22'),
            lineHeight: jarak || (jenis === 'hvs' ? '40' : '38'),
            marginTop: awal || (jenis === 'hvs' ? '80' : '105'),
            marginLeft: jenis === 'hvs' ? 80 : 75,
            marginRight: jenis === 'hvs' ? 720 : 730,
            bg: jenis === 'hvs' ? '../../assets/hvs.jpg' : '../../assets/folio.jpg'
        };

        // 2. Load Background
        try {
            const background = await loadImage(path.join(__dirname, configNulis.bg));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        } catch (e) {
            ctx.fillStyle = jenis === 'hvs' ? '#ffffff' : '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // 3. Konfigurasi Font
        ctx.font = `${configNulis.fontSize}px "Handwriting", serif`; 
        ctx.fillStyle = warna === 'blue' ? '#003399' : '#1a1a1a';
        ctx.textBaseline = 'top';

        // 4. Proses Menulis
        let x = configNulis.marginLeft;
        let y = parseInt(configNulis.marginTop);
        const words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = ctx.measureText(testLine);
            
            if (metrics.width > (configNulis.marginRight - x) && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += parseInt(configNulis.lineHeight);
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);

        // 5. Output
        const buffer = canvas.toBuffer('image/jpeg');
        res.set('Content-Type', 'image/jpeg');
        res.send(buffer);

    } catch (error) {
        res.status(500).json({ status: false, creator: config.creator, message: "Gagal render." });
    }
});

module.exports = router;