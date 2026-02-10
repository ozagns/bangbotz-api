const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

router.get('/', async (req, res) => {
    try {
        const KUMPARAN_RSS = "https://lapi.kumparan.com/v2.0/rss/";
        const searchParams = req.query.search;
        
        const feed = await parser.parseURL(KUMPARAN_RSS);
        
        let data = feed.items.map((item) => {
            // Optimasi URL Gambar dari Kumparan
            const originalImg = item.enclosure?.url || '';
            return {
                title: item.title,
                link: item.link,
                description: item.contentSnippet,
                date: item.isoDate,
                image: {
                    small: originalImg.replace("w_480", "w_240"),
                    medium: originalImg,
                    large: originalImg.replace("w_480", "w_720")
                }
            };
        });

        // Fitur Pencarian (Search)
        if (searchParams) {
            data = data.filter(item => 
                item.title.toLowerCase().includes(searchParams.toLowerCase())
            );
        }

        res.json({
            status: true,
            creator: "BangBotz",
            total: data.length,
            result: data
        });
    } catch (e) {
        res.status(400).json({ 
            status: false, 
            creator: "BangBotz",
            message: "Gagal mengambil berita Kumparan" 
        });
    }
});

module.exports = router;