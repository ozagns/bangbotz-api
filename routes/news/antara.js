const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser();

// Menggunakan path / agar parameter dikelola di index.js atau buat :type opsional
router.get('/:type?', async (req, res) => {
    try {
        // Daftar kategori valid Antara News sebagai pengaman
        const validCategories = ['terbaru', 'politik', 'ekonomi', 'bola', 'hiburan', 'tekno', 'otomotif'];
        
        let type = req.params.type || 'terbaru';
        
        // Cek jika kategori ada dalam daftar, jika tidak gunakan 'terbaru'
        if (!validCategories.includes(type.toLowerCase())) {
            type = 'terbaru';
        }

        const searchParams = req.query.search;
        const ANTARA_RSS = `https://www.antaranews.com/rss/${type}.xml`;

        const feed = await parser.parseURL(ANTARA_RSS);
        
        let data = feed.items.map((item) => {
            // Regex aman untuk ambil gambar
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
        // Jika RSS gagal diakses, kirim pesan error tanpa membuat server crash
        res.status(200).json({ 
            status: false, 
            creator: "BangBotz",
            message: "Gagal mengambil data dari Antara News. Pastikan kategori benar." 
        });
    }
});

module.exports = router;