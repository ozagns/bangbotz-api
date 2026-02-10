const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

router.get('/', async (req, res) => {
    try {
        const TEMPO_RSS = "http://rss.tempo.co/";
        const searchParams = req.query.search;
        
        const feed = await parser.parseURL(TEMPO_RSS);
        
        let data = feed.items.map((item) => {
            return {
                title: item.title,
                link: item.link,
                date: item.isoDate,
                // Tempo terkadang tidak menyertakan enclosure gambar secara default di RSS utama
                image: item.enclosure?.url || null 
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
            message: "Gagal mengambil berita Tempo" 
        });
    }
});

module.exports = router;