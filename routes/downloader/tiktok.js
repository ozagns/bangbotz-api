const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json({ status: false, message: "URL is required" });

    try {
        const response = await axios.get(`https://api.danzy.web.id/api/download/tiktok?url=${encodeURIComponent(url)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            }
        });
        
        res.json({
            status: true,
            creator: "ozagns",
            result: response.data 
        });
    } catch (e) {
        res.json({ 
            status: false, 
            creator: "ozagns",
            message: "Akses ditolak oleh sumber (403)",
            error: e.message 
        });
    }
});

module.exports = router;