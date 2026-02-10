const express = require('express');
const app = express();

// 1. Import Routes Modular per File (Bukan lagi satu file downloader.js)
const tiktokRoute = require('./routes/downloader/tiktok');
const igRoute = require('./routes/downloader/ig');

app.use(express.json());

// 2. Tampilan Utama (Landing Page)
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
                    <li>Check Status</li>
                    <li>TikTok Downloader</li>
                    <li>IG Downloader</li>
                </ul>
            </div>
            <hr style="width: 200px; border: 0.5px solid #333;">
            <p style="color: #888;">Created by <b>ozagns</b></p>
        </body>
    </html>
    `);
});

// 3. Gunakan Route Modular Baru
// Alamat akan menjadi: bangbotz.vercel.app/api/download/tiktok
app.use('/api/download/tiktok', tiktokRoute);
app.use('/api/download/ig', igRoute);

// 4. Endpoint Check Status
app.get('/api/check', (req, res) => {
    res.json({ 
        status: "success", 
        message: "Bangbotz API is ready!",
        author: "ozagns" 
    });
});

module.exports = app;