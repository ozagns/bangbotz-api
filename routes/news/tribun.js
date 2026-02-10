const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

// Fungsi utama untuk fetch data Tribun berdasarkan zone
const fetchTribun = async (req, res) => {
    try {
        // Jika tidak ada zone, default ke 'www' (nasional)
        const zone = req.params.zone || 'www';
        const searchParams = req.query.search;
        const TRIBUN_RSS = `https://${zone}.tribunnews.com/rss/`;

        const feed = await parser.parseURL(TRIBUN_RSS);
        
        let data = feed.items.map((item) => {
            // Logika penggantian thumbnail ke gambar kualitas tinggi
            const originalImg = item.enclosure?.url || null;
            const highResImg = originalImg ? originalImg.replace("thumbnails2", "images") : null;

            return {
                title: item.title,
                link: item.link,
                description: item.contentSnippet,
                date: item.isoDate,
                image: highResImg
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
            message: `Result of zone ${zone} news in Tribun News`,
            total: data.length,
            result: data
        });
    } catch (e) {
        res.status(400).json({ 
            status: false, 
            creator: "BangBotz",
            message: "Gagal mengambil berita Tribun atau zona tidak valid" 
        });
    }
};

// Daftarkan rute eksplisit untuk menghindari PathError
router.get('/', fetchTribun);
router.get('/:zone', fetchTribun);

module.exports = router;