const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

async function ttdown(url) {
    try {
        // 1. Ambil Cookie dan Token awal dari halaman depan
        const { data: html, headers } = await axios.get('https://musicaldown.com/en', {
            headers: { 
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' 
            }
        });
        const $ = cheerio.load(html);
        
        const payload = {};
        $('#submit-form input').each((i, elem) => {
            const name = $(elem).attr('name');
            const value = $(elem).attr('value');
            if (name) payload[name] = value || '';
        });
        
        // Cari field input yang kosong untuk menaruh URL TikTok
        const urlField = Object.keys(payload).find(key => !payload[key]);
        if (urlField) payload[urlField] = url;
        
        // 2. Kirim Post Request untuk mendapatkan link download
        const { data: resData } = await axios.post('https://musicaldown.com/download', new URLSearchParams(payload).toString(), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'cookie': headers['set-cookie'] ? headers['set-cookie'].join('; ') : '',
                'origin': 'https://musicaldown.com',
                'referer': 'https://musicaldown.com/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            }
        });
        
        const $$ = cheerio.load(resData);
        const downloads = [];
        $$('a.download').each((i, elem) => {
            const $elem = $$(elem);
            const link = $elem.attr('href');
            if (link && link !== '#') {
                downloads.push({
                    label: $elem.text().trim().replace(/\s+/g, ' '),
                    url: link
                });
            }
        });

        if (downloads.length === 0) throw new Error("Video links not found. Check the TikTok URL.");
        
        return {
            title: $$('.video-desc').text().trim() || "TikTok Video",
            author: $$('.video-author b').text().trim() || "Unknown",
            downloads: downloads
        };
    } catch (error) {
        throw new Error("Scraper Error: " + error.message);
    }
}

router.get('/', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json({ status: false, message: "URL is required" });

    try {
        const result = await ttdown(url);
        res.json({
            status: true,
            creator: "ozagns",
            result: result
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: "ozagns",
            message: e.message 
        });
    }
});

module.exports = router;