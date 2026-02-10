const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');

router.get('/', async (req, res) => {
    try {
        const url = req.query.url;

        if (!url) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "Masukkan parameter url gambar QR!"
            });
        }

        // Gunakan encodeURIComponent dua kali jika perlu, atau pastikan URL bersih
        const cleanUrl = encodeURIComponent(url.trim());
        const apiUrl = `https://api.qrserver.com/v1/read-qr-code/?fileurl=${cleanUrl}`;
        
        const response = await axios.get(apiUrl);
        
        // QRServer terkadang memberikan response sukses tapi datanya kosong
        const result = response.data[0]?.symbol[0];

        if (!result || result.error || !result.data) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "QR Code tidak terbaca. Pastikan link gambar adalah direct link"
            });
        }

        res.json({
            status: true,
            creator: config.creator,
            result: {
                isi_qr: result.data,
                format: result.seq
            }
        });

    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal menghubungi server QR" 
        });
    }
});

module.exports = router;