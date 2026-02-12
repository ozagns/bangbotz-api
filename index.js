require('dotenv').config();

const express = require('express');
const app = express();
const config = require('./config');

// 1. Import Routes Modular
const tiktokRoute = require('./routes/downloader/tiktok');
const igRoute = require('./routes/downloader/ig');
const cnnRoute = require('./routes/news/cnn');
const cnbcRoute = require('./routes/news/cnbc');
const kumparanRoute = require('./routes/news/kumparan');
const republikaRoute = require('./routes/news/republika');
const tempoRoute = require('./routes/news/tempo');
const viceRoute = require('./routes/news/vice');
const voaRoute = require('./routes/news/voa');
const gempaRoute = require('./routes/information/gempa');
const weatherRoute = require('./routes/information/weather');
const qrRoute = require('./routes/tools/qr');
const qrDecoderRoute = require('./routes/tools/qrdecoder');
const wifiQRRoute = require('./routes/tools/wifiqr');
const asahOtakRoute = require('./routes/game/asahotak');
const family100Router = require('./routes/game/family100');
const islamRouter = require('./routes/game/islam');
const merdekaRouter = require('./routes/game/merdeka');
const mathRouter = require('./routes/game/math');
const mathV2Router = require('./routes/game/mathv2');
const siapakahRouter = require('./routes/game/siapakahaku');
const susunRouter = require('./routes/game/susunkata');
const benderaRouter = require('./routes/game/tebakbendera');
const animeRouter = require('./routes/game/tebakanime');
const tebakGambarRouter = require('./routes/game/tebakgambar');
const mlRouter = require('./routes/game/tebakml');
const drakorRouter = require('./routes/game/tebakdrakor');
const jenakaRouter = require('./routes/game/tebakjenaka');
const kbbiSearchRouter = require('./routes/search/kbbi');
const kursRouter = require('./routes/search/kurs');
const wormgptRouter = require('./routes/ai/wormgpt');
const kodeposRouter = require('./routes/search/kodepos');
const isgdRoute = require('./routes/tools/is-gd');
const tinyurlRoute = require('./routes/tools/tinyurl');
const vgdRoute = require('./routes/tools/v-gd');
const dagdRoute = require('./routes/tools/da-gd');
const expandRoute = require('./routes/tools/expand-url');
const screenshotRoute = require('./routes/tools/screenshot');
const nulisRoute = require('./routes/tools/nulis');
const tebakKalimatRoute = require('./routes/game/tebak-kalimat');
const tebakKataRoute = require('./routes/game/tebak-kata');
const tebakEmoteRoute = require('./routes/game/tebak-emote');
const tebakKimiaRoute = require('./routes/game/tebak-kimia');
const tebakLaguRoute = require('./routes/game/tebak-lagu');
const tebakLirikRoute = require('./routes/game/tebak-lirik');
const tebakKodeRoute = require('./routes/game/tebak-kode');
const tebakLogoRoute = require('./routes/game/tebak-logo');
const tebakMakananRoute = require('./routes/game/tebak-makanan');
const tebakPahlawanRoute = require('./routes/game/tebak-pahlawan');
const tebakTokohRoute = require('./routes/game/tebak-tokoh');
const bratRoute = require('./routes/maker/brat');
const bratVidRoute = require('./routes/maker/bratvid');

app.use(express.json());

// 2. Tampilan Utama (Update Daftar Fitur)
app.get('/', (req, res) => {
    res.send(`
    <html>
        <head><title>Bangbotz API</title></head>
        <body style="background: #121212; color: white; font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1 style="font-size: 3em; margin-bottom: 10px;">🤖 Bangbotz API</h1>
            <p style="font-size: 1.2em;">Status: <span style="color: #00ff00;">Online 🕑</span></p>
            <div style="margin: 30px auto; width: 300px; padding: 20px; border: 1px dashed #444; border-radius: 10px;">
                <p>Fitur Tersedia:</p>
                <ul style="text-align: left; display: inline-block;">
                    <li>✅ Check Status</li>
                    <li>✅ TikTok Downloader</li>
                    <li>✅ IG Downloader</li>
                    <li>✅ CNN News (New)</li>
                </ul>
            </div>
            <hr style="width: 200px; border: 0.5px solid #333;">
            <p style="color: #888;">Created by <b>BangBotz</b></p>
        </body>
    </html>
    `);
});

// 3. Gunakan Route Modular
app.use('/api/download/tiktok', tiktokRoute);
app.use('/api/download/ig', igRoute);
app.use('/api/news/cnn', cnnRoute);
app.use('/api/news/cnbc', cnbcRoute);
app.use('/api/news/kumparan', kumparanRoute);
app.use('/api/news/republika', republikaRoute);
app.use('/api/news/tempo', tempoRoute);
app.use('/api/news/vice', viceRoute);
app.use('/api/news/voa', voaRoute);
app.use('/api/info/gempa', gempaRoute);
app.use('/api/info/weather', weatherRoute);
app.use('/api/tools/qr', qrRoute);
app.use('/api/tools/qr-decode', qrDecoderRoute);
app.use('/api/tools/wifi-qr', wifiQRRoute);
app.use('/api/game/asahotak', asahOtakRoute);
app.use('/api/game/family100', family100Router);
app.use('/api/game/islam', islamRouter);
app.use('/api/game/merdeka', merdekaRouter);
app.use('/api/game/math', mathRouter);
app.use('/api/game/mathv2', mathV2Router);
app.use('/api/game/siapakahaku', siapakahRouter);
app.use('/api/game/susunkata', susunRouter);
app.use('/api/game/tebakbendera', benderaRouter);
app.use('/api/game/tebakanime', animeRouter);
app.use('/api/game/tebakgambar', tebakGambarRouter);
app.use('/api/game/tebakml', mlRouter);
app.use('/api/game/tebakdrakor', drakorRouter);
app.use('/api/game/tebakjenaka', jenakaRouter);
app.use('/api/search/kbbi', kbbiSearchRouter);
app.use('/api/search/kurs', kursRouter);
app.use('/api/ai/wormgpt', wormgptRouter);
app.use('/api/search/kodepos', kodeposRouter);
app.use('/api/tools/isgd', isgdRoute);
app.use('/api/tools/tinyurl', tinyurlRoute);
app.use('/api/tools/vgd', vgdRoute);
app.use('/api/tools/dagd', dagdRoute);
app.use('/api/tools/unshort', expandRoute);
app.use('/api/tools/ssweb', screenshotRoute);
app.use('/api/tools/nulis', nulisRoute);
app.use('/api/game/tebakkalimat', tebakKalimatRoute);
app.use('/api/game/tebakkata', tebakKataRoute);
app.use('/api/game/tebakemote', tebakEmoteRoute);
app.use('/api/game/tebakkimia', tebakKimiaRoute);
app.use('/api/game/tebaklagu', tebakLaguRoute);
app.use('/api/game/tebaklirik', tebakLirikRoute);
app.use('/api/game/tebakkode', tebakKodeRoute);
app.use('/api/game/tebaklogo', tebakLogoRoute);
app.use('/api/game/tebakmakanan', tebakMakananRoute);
app.use('/api/game/tebakpahlawan', tebakPahlawanRoute);
app.use('/api/game/tebaktokoh', tebakTokohRoute);
app.use('/api/maker/brat', bratRoute);
app.use('/api/maker/bratvid', bratVidRoute);

// 4. Endpoint Check Status
app.get('/api/check', (req, res) => {
    res.json({ 
        status: "success", 
        message: `${config.creator} API is ready!`,
        author: config.creator
    });
});

module.exports = app;