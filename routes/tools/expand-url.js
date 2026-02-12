const express = require('express');
const axios = require('axios');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature URL Unshortener (Expand URL)
 * @author BangBotz
 */

router.get('/', async (req, res) => {
    const shortUrl = req.query.url;

    if (!shortUrl) {
        return res.status(400).json({
            status: false,
            creator: config.creator,
            message: "Masukkan URL pendek! Contoh: ?url=https://is.gd/xyz"
        });
    }

    try {
        /**
         * Kita gunakan method 'HEAD' agar lebih cepat.
         * Kita tidak perlu download seluruh isi halaman, cuma mau liat Header-nya saja.
         */
        const response = await axios.head(shortUrl, {
            maxRedirects: 0, // Kita cegah axios otomatis pindah halaman
            validateStatus: (status) => status >= 200 && status < 400,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            }
        });

        // Link asli biasanya ada di header 'location'
        const originalUrl = response.headers.location || shortUrl;

        res.json({
            status: true,
            creator: config.creator,
            result: originalUrl
        });

    } catch (error) {
        /**
         * Beberapa shortener (seperti bitly/tinyurl) kadang minta GET request 
         * kalau HEAD ditolak. Ini adalah jalur cadangannya.
         */
        try {
            const retry = await axios.get(shortUrl, {
                maxRedirects: 5,
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });

            res.json({
                status: true,
                creator: config.creator,
                result: retry.request.res.responseUrl || shortUrl
            });
        } catch (err) {
            res.status(500).json({
                status: false,
                creator: config.creator,
                message: "Gagal mengambil link asli. Pastikan link aktif."
            });
        }
    }
});

module.exports = router;