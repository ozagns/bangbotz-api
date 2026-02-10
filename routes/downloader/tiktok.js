const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

async function ttdown(url) {
    try {
        // Ambil token dan cookie awal
        const { data: html, headers } = await axios.get('https://musicaldown.com/en', {
            headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const $ = cheerio.load(html);
        
        const payload = {};
        $('#submit-form input').each((i, elem) => {
            const name = $(elem).attr('name');
            const value = $(elem).attr('value');
            if (name) payload[name] = value || '';
        });
        
        const urlField = Object.keys(payload).find(key => !payload[key]);
        if (urlField) payload[urlField] = url;
        
        // Post data ke server download
        const { data } = await axios.post('https://musicaldown.com/download', new URLSearchParams(payload).toString(), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie: headers['set-cookie'].join('; '),
                origin: 'https://musicaldown.com',
                referer: 'https://musicaldown.com/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const $$ = cheerio.load(data);
        const downloads = [];
        $$('a.download').each((i, elem) => {
            const $elem = $$(elem);
            const type = $elem.data('event')?.replace('_download_click', '');
            downloads.push({
                type: type || 'video',
                label: $elem.text().trim(),
                url: $elem.attr('href')
            });
        });
        
        return {
            title: $$('.video-desc').text().trim(),
            author: $$('.video-author b').text().trim(),
            downloads: downloads
        };
    } catch (error) {
        throw new Error("Scraping failed: " + error.message);
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
        res.json({ 
            status: false, 
            creator: "ozagns",
            message: e.message 
        });
    }
});

module.exports = router;