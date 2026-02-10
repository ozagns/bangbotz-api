const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

router.get('/', async (req, res) => {
    try {
        const SUARA_RSS = "https://www.suara.com/rss/";
        const searchParams = req.query.search;
        
        const feed = await parser.parseURL(SUARA_RSS);
        
        let data = feed.items.map((item) => {
            const originalImg = item.enclosure?.url || '';
            return {
                title: item.title?.replace("...", "").trim(),
                link: item.link,
                description: item.contentSnippet?.trim(),
                date: item.isoDate,
                image: {
                    small: originalImg,
                    large: originalImg.replace(/q=\d+/, "q=100") // Optimasi kualitas gambar 🕑
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
            message: "Gagal mengambil berita Suara.com" 
        });
    }
});

module.exports = router;