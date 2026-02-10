const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    }
});

// Fungsi Logika Scraper
const fetchAntara = async (req, res) => {
    try {
        // Ambil kategori dari parameter URL, jika kosong gunakan 'terbaru'
        const type = req.params.type || 'terbaru';
        const searchParams = req.query.search;
        const ANTARA_RSS = `https://www.antaranews.com/rss/${type}.xml`;

        const feed = await parser.parseURL(ANTARA_RSS);
        
        let data = feed.items.map((item) => {
            const imageMatch = item.content?.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/);
            return {
                title: item.title,
                link: item.link,
                description: item.contentSnippet?.replace("...", "").trim(),
                date: item.isoDate,
                image: imageMatch ? imageMatch[1] : null
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
            total: data.length,
            result: data
        });
    } catch (e) {
        res.status(200).json({ 
            status: false, 
            creator: "BangBotz",
            message: "Kategori tidak ditemukan atau RSS sedang gangguan",
            error: e.message
        });
    }
};

// Daftarkan dua rute terpisah untuk menangani tanpa kategori & dengan kategori
router.get('/', fetchAntara); 
router.get('/:type', fetchAntara);

module.exports = router;