const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');

// Inisialisasi parser dengan customFields untuk membaca 'media:content' 🕑
const parser = new Parser({
    customFields: {
        item: ['media:content'],
    }
});

router.get('/', async (req, res) => {
    try {
        const REPUBLIKA_RSS = "https://www.republika.co.id/rss";
        const searchParams = req.query.search;
        
        const feed = await parser.parseURL(REPUBLIKA_RSS);
        
        let data = feed.items.map((item) => {
            // Mengambil URL gambar dari media:content
            // Biasanya strukturnya adalah item['media:content']['$']['url']
            const imageUrl = item['media:content'] && item['media:content']['$'] 
                             ? item['media:content']['$']['url'] 
                             : null;

            return {
                title: item.title?.trim(),
                link: item.link,
                description: item.contentSnippet,
                date: item.isoDate,
                image: {
                    small: imageUrl
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
            message: "Gagal mengambil berita Republika" 
        });
    }
});

module.exports = router;