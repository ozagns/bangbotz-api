const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/create', async (req, res) => {
    try {
        const text = req.query.text;

        // Validasi: User wajib input teks atau URL
        if (!text) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "Masukkan parameter teks! Contoh: ?text=HaloBangBotz"
            });
        }

        // Susun URL QR Code
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;

        res.json({
            status: true,
            creator: config.creator,
            result: {
                data: text,
                url: qrUrl
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal membuat QR Code" 
        });
    }
});

module.exports = router;