const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');

router.get('/', async (req, res) => {
    const query = req.query.q; // Mengambil kata kunci dari parameter ?q=

    if (!query) {
        return res.status(400).json({
            status: false,
            creator: config.creator,
            message: "Parameter 'q' tidak boleh kosong! Contoh: /api/search/kbbi?q=meja"
        });
    }

    try {
        const url = `https://openapi.x-labs.my.id/kbbi/search/${encodeURIComponent(query)}`;
        const response = await axios.get(url);
        const result = response.data;

        if (result.success && result.data.length > 0) {
            // Merapikan data agar lebih enak dibaca oleh Bot WhatsApp
            const data = result.data[0];
            res.json({
                status: true,
                creator: config.creator,
                result: {
                    kata: data.word,
                    lema: data.lema,
                    arti: data.arti.map(item => item.deskripsi), // Mengambil semua deskripsi arti
                    tesaurus: data.tesaurusLink
                }
            });
        } else {
            res.status(404).json({
                status: false,
                creator: config.creator,
                message: `Kata '${query}' tidak ditemukan dalam KBBI.`
            });
        }
    } catch (e) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Terjadi kesalahan pada server KBBI."
        });
    }
});

module.exports = router;