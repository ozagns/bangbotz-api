const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const router = express.Router();

router.get('/', async (req, res) => {
    const { text, server } = req.query;
    if (!text) return res.status(400).json({ status: false, message: "Masukkan parameter 'text'." });

    const words = text.split(' ');
    const timestamp = Date.now();
    const tempDir = path.join(__dirname, `../../temp/brat_${timestamp}`);
    
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    try {
        // 1. Download frame per kata dengan nama file berurutan (001, 002, dst)
        for (let i = 0; i < words.length; i++) {
            const currentText = words.slice(0, i + 1).join(' ');
            const imageUrl = server === '2' 
                ? `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(currentText)}`
                : `https://aqul-brat.hf.space/?text=${encodeURIComponent(currentText)}`;

            const response = await axios({ url: imageUrl, responseType: 'arraybuffer' });
            // Format nama file 3 digit agar ffmpeg bacanya gampang
            const fileName = `frame_${String(i + 1).padStart(3, '0')}.png`;
            fs.writeFileSync(path.join(tempDir, fileName), response.data);
        }

        const outputVid = path.join(tempDir, 'output.mp4');

        // 2. Rakit pake pola urutan gambar
        ffmpeg()
            .input(path.join(tempDir, 'frame_%03d.png')) // Ambil file frame_001, frame_002, dst
            .inputOptions([
                '-framerate 2', // 2 frame per detik (artinya 1 kata muncul selama 0.5 detik)
                '-f image2'
            ])
            .videoCodec('libx264')
            .outputOptions([
                '-pix_fmt yuv420p',
                '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
            ])
            .on('end', () => {
                res.sendFile(outputVid, () => {
                    // Cleanup folder
                    fs.rmSync(tempDir, { recursive: true, force: true });
                });
            })
            .on('error', (err) => {
                console.error(err);
                if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
                res.status(500).json({ status: false, message: "Gagal merakit video." });
            })
            .save(outputVid);

    } catch (error) {
        console.error(error);
        if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
        res.status(500).json({ status: false, message: "Error saat proses." });
    }
});

module.exports = router;