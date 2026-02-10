const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    }
});

async function getAntaraNews(req, res) {
    try {
        // Pemetaan kategori terbaru Antara News (Update 2026)
        const categories = {
            terbaru: 'terbaru',
            politik: 'politik',
            ekonomi: 'ekonomi',
            bola: 'bola',
            hiburan: 'hiburan',
            tekno: 'tekno',
            otomotif: 'otomotif',
            warta-bumi: 'warta-bumi'
        };

        const type = categories[req.params.type] || 'terbaru';
        const searchParams = req.query.search;
        
        // URL RSS Antara terbaru menggunakan subfolder /ind/
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
            message: `Gagal akses RSS Antara. Gunakan kategori: terbaru, politik, ekonomi, bola, hiburan, tekno, otomotif. 🕑`,
            error: e.message
        });
    }
}

router.get('/', getAntaraNews);
router.get('/:type', getAntaraNews);

module.exports = router;