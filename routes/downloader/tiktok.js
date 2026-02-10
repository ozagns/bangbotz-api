const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

async function ttdown(url) {
    const config = {
        headers: {
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.9',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1'
        }
    };

    try {
        // Step 1: Ambil Token & Cookie
        const { data: html, headers } = await axios.get('https://musicaldown.com/en', config);
        const $ = cheerio.load(html);
        const cookie = headers['set-cookie'] ? headers['set-cookie'].join('; ') : '';
        
        const payload = {};
        $('#submit-form input').each((i, elem) => {
            const name = $(elem).attr('name');
            const value = $(elem).attr('value');
            if (name) payload[name] = value || '';
        });
        
        const urlField = Object.keys(payload).find(key => !payload[key]);
        if (urlField) payload[urlField] = url;

        // Step 2: Kirim Post dengan Cookie
        const { data: resData } = await axios.post('https://musicaldown.com/download', new URLSearchParams(payload).toString(), {
            headers: {
                ...config.headers,
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookie,
                'origin': 'https://musicaldown.com',
                'referer': 'https://musicaldown.com/en'
            }
        });
        
        const $$ = cheerio.load(resData);
        const downloads = [];
        $$('a.download').each((i, elem) => {
            const link = $$(elem).attr('href');
            if (link && !link.includes('facebook') && link !== '#') {
                downloads.push({
                    label: $$(elem).text().trim().replace(/\s+/g, ' '),
                    url: link
                });
            }
        });

        if (downloads.length === 0) throw new Error("Gagal mendapatkan link download. Coba link TikTok lain.");
        
        return {
            title: $$('.video-desc').text().trim(),
            author: $$('.video-author b').text().trim(),
            downloads: downloads
        };
    } catch (error) {
        throw new Error(error.response?.status === 403 ? "IP Vercel diblokir oleh sumber (403)" : error.message);
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
        res.json({ status: false, creator: "ozagns", message: e.message });
    }
});

module.exports = router;