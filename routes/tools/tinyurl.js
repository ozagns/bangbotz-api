const express = require('express');
const axios = require('axios');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature TinyURL Shortener
 * @author BangBotz
 */

router.get('/', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({
            status: false,
            creator: config.creator,
            message: "Masukkan URL! Contoh: ?url=https://google.com"
        });
    }

    try {
        // TinyURL API (Format teks mentah, sangat stabil)
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        
        res.json({
            status: true,
            creator: config.creator,
            result: response.data
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Server TinyURL sedang sibuk."
        });
    }
});

module.exports = router;