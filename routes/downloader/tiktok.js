const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json({ status: false, message: "URL is required" });

    try {
        // Menggunakan API sumber lain sebagai cadangan jika Danzy error
        const response = await axios.get(`https://api.danzy.web.id/api/download/tiktok?url=${encodeURIComponent(url)}`);
        
        res.json({
            status: true,
            creator: "ozagns",
            result: response.data 
        });
    } catch (e) {
        // Menampilkan pesan error yang lebih jelas untuk debug
        res.json({ 
            status: false, 
            creator: "ozagns",
            message: "API sumber sedang gangguan atau limit",
            error: e.message 
        });
    }
});

module.exports = router;