const express = require('express');
const axios = require('axios');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature v.gd URL Shortener (Direct Proxy)
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

    // Pastikan protokol URL ada
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    try {
        /**
         * v.gd sangat galak sama bot. 
         * Kita tembak lewat 'pintu belakang' AllOrigins Proxy.
         */
        const targetUrl = `https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

        const { data } = await axios.get(proxyUrl, { timeout: 15000 });

        if (data && data.contents) {
            const resultText = data.contents.trim();

            // v.gd biasanya ngasih link https://v.gd/xxxx
            if (resultText.startsWith('https://v.gd/')) {
                res.json({
                    status: true,
                    creator: config.creator,
                    result: resultText
                });
            } else {
                // Jika isinya pesan error dari v.gd
                res.status(400).json({
                    status: false,
                    creator: config.creator,
                    message: `v.gd: ${resultText}`
                });
            }
        } else {
            throw new Error("Respon proxy kosong.");
        }

    } catch (error) {
        // Gak ada fallback ke TinyURL lagi di sini!
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal nembus v.gd. Sepertinya Cloudflare mereka lagi sensitif banget."
        });
    }
});

module.exports = router;