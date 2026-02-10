const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

// Helper untuk membatasi panjang string agar rapi di chat WA
const limitString = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "...." : str;
};

router.get('/', async (req, res) => {
    try {
        const VOA_RSS = "https://www.voaindonesia.com/api/zmgqoe$moi";
        const searchParams = req.query.search;
        
        const feed = await parser.parseURL(VOA_RSS);
        
        let data = feed.items.map((item) => {
            return {
                title: item.title,
                link: item.link,
                description: limitString(item.contentSnippet || "", 450),
                date: item.isoDate,
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
            message: "Gagal mengambil berita VOA Indonesia" 
        });
    }
});

module.exports = router;