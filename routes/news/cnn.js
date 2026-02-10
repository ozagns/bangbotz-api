const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

router.get('/', async (req, res) => {
    try {
        const url = "https://www.cnnindonesia.com/rss";
        const feed = await parser.parseURL(url);
        
        const result = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            content: item.contentSnippet,
            date: item.isoDate,
            image: item.enclosure?.url
        }));

        res.json({
            status: true,
            creator: "ozagns",
            total: result.length,
            result: result
        });
    } catch (e) {
        res.json({ status: false, message: e.message });
    }
});

module.exports = router;