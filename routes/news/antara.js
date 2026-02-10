const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

// Endpoint: /api/news/antara/:type
router.get('/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const searchParams = req.query.search;
        const ANTARA_RSS = `https://www.antaranews.com/rss/${type}.xml`;

        const feed = await parser.parseURL(ANTARA_RSS);
        
        let data = feed.items.map((item) => {
            // Logika Regex untuk mengambil URL gambar dari tag <img> di dalam konten
            const imageMatch = item.content?.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/);
            const image = imageMatch ? imageMatch[1] : null;

            return {
                title: item.title,
                link: item.link,
                description: item.contentSnippet?.replace("...", "").trim(),
                date: item.isoDate,
                image: image
            };
        });

        // Fitur Search
        if (searchParams) {
            data = data.filter(item => 
                item.title.toLowerCase().includes(searchParams.toLowerCase())
            );
        }

        res.json({
            status: true,
            creator: "BangBotz",
            message: `Result of type ${type} news in Antara News`,
            total: data.length,
            result: data
        });
    } catch (e) {
        res.status(400).json({ 
            status: false, 
            creator: "BangBotz",
            message: "Something error or category not found" 
        });
    }
});

module.exports = router;