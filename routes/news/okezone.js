const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');

// Inisialisasi parser dengan customFields untuk membaca 'imglink' 🕑
const parser = new Parser({
    customFields: {
        item: ['imglink'],
    }
});

router.get('/', async (req, res) => {
    try {
        const OKEZONE_RSS = "https://sindikasi.okezone.com/index.php/rss/1/RSS2.0";
        const searchParams = req.query.search;
        
        const feed = await parser.parseURL(OKEZONE_RSS);
        
        let data = feed.items.map((item) => {
            // Helper untuk mengganti query params gambar
            const getImg = (url, width) => url ? url.replace(/w=\d+/, `w=${width}`) : null;

            return {
                title: item.title,
                link: item.link,
                date: item.isoDate,
                image: {
                    small: getImg(item.imglink, "300"),
                    medium: getImg(item.imglink, "500"),
                    large: getImg(item.imglink, "800")
                }
            };
        });

        // Fitur Pencarian
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
            message: "Gagal mengambil berita Okezone" 
        });
    }
});

module.exports = router;