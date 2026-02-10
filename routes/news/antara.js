const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

async function getAntaraNews(req, res) {
    try {
        // Daftar kategori resmi yang didukung Antara News
        const categories = {
            terbaru: 'terbaru',
            politik: 'politik',
            ekonomi: 'ekonomi',
            bola: 'bola',
            hiburan: 'hiburan',
            tekno: 'tekno',
            otomotif: 'otomotif',
            terpopuler: 'terpopuler'
        };

        const type = categories[req.params.type] || 'terbaru';
        const searchParams = req.query.search;
        // Pastikan format URL benar: /rss/[kategori].xml
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
        res.json({ 
            status: false, 
            creator: "BangBotz",
            message: "Gagal mengambil data." 
        });
    }
}

router.get('/', getAntaraNews);
router.get('/:type', getAntaraNews);

module.exports = router;