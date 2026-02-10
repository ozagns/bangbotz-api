const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

// Menggunakan :type? agar link /api/news/antara tidak error
router.get('/:type?', async (req, res) => {
    try {
        // Jika tidak ada type, otomatis ambil 'terpopuler'
        const type = req.params.type || 'terpopuler'; 
        const searchParams = req.query.search;
        const ANTARA_RSS = `https://www.antaranews.com/rss/${type}.xml`;

        const feed = await parser.parseURL(ANTARA_RSS);
        
        let data = feed.items.map((item) => {
            // Mengambil gambar dari tag <img> di dalam content
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
            message: "Kategori tidak ditemukan atau API Antara sedang gangguan" 
        });
    }
});

module.exports = router;