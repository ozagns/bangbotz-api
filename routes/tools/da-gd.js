const express = require('express');
const axios = require('axios');
const config = require('../../config');

const router = express.Router();

router.get('/', async (req, res) => {
    let url = req.query.url;
    if (!url) return res.status(400).json({ status: false, creator: config.creator, message: "Masukkan URL!" });

    try {
        // Kita pakai trik header lengkap biar disangka manusia
        const response = await axios.get(`https://da.gd/s?url=${encodeURIComponent(url)}`, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'text/plain',
                'Referer': 'https://da.gd/'
            }
        });

        if (response.data && response.data.includes('https://da.gd/')) {
            res.json({
                status: true,
                creator: config.creator,
                result: response.data.trim()
            });
        } else {
            throw new Error("Respon tidak valid");
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "IP Server diblokir da.gd. Gunakan TinyURL yang lebih stabil."
        });
    }
});

module.exports = router;