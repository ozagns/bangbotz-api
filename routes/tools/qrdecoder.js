const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');

router.get('/', async (req, res) => {
    try {
        const url = req.query.url;

        // Validasi: Memastikan user mengirimkan link gambar
        if (!url) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "Silakan masukkan parameter url gambar QR! Contoh: ?url=https://link-gambar.com/qr.png"
            });
        }

        // Proses pembacaan QR via QRServer
        const response = await axios.get(`https://api.qrserver.com/v1/read-qr-code/?fileurl=${encodeURIComponent(url)}`);
        
        // Mengambil hasil dari struktur array QRServer
        const result = response.data[0].symbol[0];

        // Jika gambar bukan QR atau tidak terbaca
        if (!result.data || result.error) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "QR Code tidak terdeteksi. Pastikan gambar jelas dan merupakan QR Code yang valid"
            });
        }

        res.json({
            status: true,
            creator: config.creator,
            result: {
                isi_qr: result.data,
                format: result.seq || "Unknown"
            }
        });

    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Terjadi kesalahan sistem saat membaca QR" 
        });
    }
});

module.exports = router;