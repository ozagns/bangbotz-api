const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

// Fungsi utama scraper
async function getAntaraNews(req, res) {
    try {
        const type = req.params.type || 'terbaru';
        const searchParams = req.query.search;
        const ANTARA_RSS = `https://www.antaranews.com/rss/${type}.xml`;

        const feed = await parser.parseURL(ANTARA_RSS);
        
        let data = feed.items.map((item) => {
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
        res.status(200).json({ 
            status: false, 
            creator: "BangBotz",
            message: "Kategori tidak ditemukan atau RSS sedang gangguan" 
        });
    }
}

// Definisikan rute secara eksplisit untuk menghindari PathError 
router.get('/', getAntaraNews); // Menangani /api/news/antara
router.get('/:type', getAntaraNews); // Menangani /api/news/antara/politik

module.exports = router;