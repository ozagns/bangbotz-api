const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');

// Inisialisasi parser untuk membaca media:content (gambar)
const parser = new Parser({
    customFields: {
        item: ['media:content'],
    }
});

const fetchJawaPos = async (req, res) => {
    try {
        const type = req.params.type || 'all'; 
        const searchParams = req.query.search;
        const JAWAPOS_RSS = `https://zetizen.jawapos.com/rss/${type}`;

        const feed = await parser.parseURL(JAWAPOS_RSS);
        
        let data = feed.items.map((item) => {
            const imageUrl = item['media:content'] && item['media:content']['$'] 
                             ? item['media:content']['$']['url'] 
                             : null;

            return {
                title: item.title?.trim(),
                link: item.link,
                date: item.isoDate,
                image: imageUrl
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
            message: `Result of type ${type} news in Jawa Pos`,
            total: data.length,
            result: data
        });
    } catch (e) {
        res.status(400).json({ 
            status: false, 
            creator: "BangBotz",
            message: "Gagal mengambil berita Jawa Pos" 
        });
    }
};

router.get('/', fetchJawaPos);
router.get('/:type', fetchJawaPos);

module.exports = router;