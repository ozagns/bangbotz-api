const express = require('express');
const axios = require('axios');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Web Screenshot HD
 * @author BangBotz
 */

router.get('/', async (req, res) => {
    let url = req.query.url;
    if (!url) return res.status(400).json({ status: false, message: "Masukkan URL!" });

    if (!url.startsWith('http')) url = 'https://' + url;

    try {
        /**
         * Jalur HD: Microlink API. 
         * Hasilnya jauh lebih jernih dibanding Thum.io karena mendukung High DPI.
         */
        const screenshotApi = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
        
        const response = await axios.get(screenshotApi, { 
            responseType: 'arraybuffer',
            timeout: 25000 
        });

        // Kirim sebagai gambar PNG (Kualitas lebih baik dari JPEG)
        res.set('Content-Type', 'image/png');
        res.send(response.data);

    } catch (error) {
        // Cadangan jika Microlink sibuk
        try {
            const fallback = `https://image.thum.io/get/width/1920/crop/1080/noanimate/${url}`;
            const fbRes = await axios.get(fallback, { responseType: 'arraybuffer' });
            res.set('Content-Type', 'image/png');
            res.send(fbRes.data);
        } catch (err) {
            res.status(500).json({
                status: false,
                creator: config.creator,
                message: "Gagal mengambil screenshot HD."
            });
        }
    }
});

module.exports = router;