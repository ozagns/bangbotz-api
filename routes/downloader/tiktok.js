const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json({ status: false, message: "URL is required" });

    try {
        // Ganti URL di bawah dengan REST API siap pakai milikmu
        const response = await axios.get(`https://api.danzy.web.id/api/download/tiktok?url=${url}`);
        
        res.json({
            status: true,
            creator: "ozagns",
            result: response.data 
        });
    } catch (e) {
        res.json({ status: false, message: "Error fetching data" });
    }
});

module.exports = router;