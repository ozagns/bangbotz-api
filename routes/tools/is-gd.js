const express = require('express');
const axios = require('axios');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature is.gd URL Shortener (Direct Proxy)
 * @author BangBotz
 */

router.get('/', async (req, res) => {
    let url = req.query.url;

    if (!url) {
        return res.status(400).json({
            status: false,
            creator: config.creator,
            message: "Masukkan URL! Contoh: ?url=https://google.com"
        });
    }

    // Pastikan protokol URL benar
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    try {
        /**
         * Jalur Gacor: Menembak is.gd via AllOrigins Proxy
         * Kita hilangkan fallback ke TinyURL.
         */
        const targetUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

        const { data } = await axios.get(proxyUrl, { timeout: 15000 });

        // Validasi hasil dari AllOrigins
        if (data && data.contents) {
            const resultText = data.contents.trim();

            // Cek apakah responnya beneran link is.gd atau pesan error dari is.gd
            if (resultText.startsWith('https://is.gd/')) {
                res.json({
                    status: true,
                    creator: config.creator,
                    result: resultText
                });
            } else {
                res.status(400).json({
                    status: false,
                    creator: config.creator,
                    message: "is.gd menolak URL tersebut (Mungkin spam atau dilarang)."
                });
            }
        } else {
            throw new Error("Proxy tidak memberikan respon valid.");
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal menghubungkan ke is.gd via Proxy. Coba lagi nanti."
        });
    }
});

module.exports = router;