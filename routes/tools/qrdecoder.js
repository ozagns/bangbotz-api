const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');

router.get('/', async (req, res) => {
    try {
        const imageUrl = req.query.url;

        if (!imageUrl) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "Masukkan parameter url gambar QR!"
            });
        }

        // Tahap 1: Gunakan axios untuk 'ngetes' apakah gambar bisa diakses
        // Kita pakai User-Agent browser agar tidak diblokir server gambar
        try {
            await axios.get(imageUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "Gambar tidak dapat diakses oleh server (403 Forbidden/404). Coba upload ulang gambarnya"
            });
        }

        // Tahap 2: Kirim ke QRServer dengan encoding yang benar
        const apiUrl = `https://api.qrserver.com/v1/read-qr-code/?fileurl=${encodeURIComponent(imageUrl.trim())}`;
        const response = await axios.get(apiUrl);
        
        const result = response.data[0]?.symbol[0];

        if (!result || result.error || !result.data) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "QR Code tidak terbaca. Pastikan gambar tidak terlalu pecah dan polanya terlihat jelas"
            });
        }

        res.json({
            status: true,
            creator: config.creator,
            result: {
                isi_qr: result.data,
                format: result.seq || "QR Code"
            }
        });

    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Sistem decoder sedang sibuk, coba lagi nanti" 
        });
    }
});

module.exports = router;