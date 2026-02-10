const express = require('express');
const router = express.Router();

// Endpoint untuk TikTok: /api/download/tiktok
router.get('/tiktok', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: "Link TikTok mana? 🕑" });

    res.json({
        status: "success",
        creator: "ozagns",
        result: { url, note: "Logika TikTok siap diisi 🕑" }
    });
});

// Endpoint untuk Instagram: /api/download/ig
router.get('/ig', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: "Link IG mana? 🕑" });

    res.json({
        status: "success",
        creator: "ozagns",
        result: { url, note: "Logika Instagram siap diisi 🕑" }
    });
});

module.exports = router;