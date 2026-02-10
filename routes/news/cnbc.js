const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

router.get('/', async (req, res) => {
    try {
        const CNBC_RSS = "https://www.cnbcindonesia.com/rss";
        const url = new URL(req.url, `http://${req.headers.host}`);
        const searchParams = url.searchParams.get("search");

        const feed = await parser.parseURL(CNBC_RSS);
        
        let data = feed.items.map((item) => {
            return {
                title: item.title,
                link: item.link,
                content: item.contentSnippet,
                date: item.isoDate,
                image: {
                    small: item.enclosure?.url,
                    large: item.enclosure?.url ? item.enclosure.url.replace(/q=\d+/, 'q=100') : null
                }
            };
        });

        // Logika fitur Search (Pencarian)
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
            message: "Something error while fetching CNBC news" 
        });
    }
});

module.exports = router;