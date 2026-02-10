const express = require('express');
const app = express();

// 1. Import Routes Modular
const tiktokRoute = require('./routes/downloader/tiktok');
const igRoute = require('./routes/downloader/ig');
const cnnRoute = require('./routes/news/cnn');
const cnbcRoute = require('./routes/news/cnbc');
const kumparanRoute = require('./routes/news/kumparan');
const republikaRoute = require('./routes/news/republika');
const tempoRoute = require('./routes/news/tempo');
const tribunRoute = require('./routes/news/tribun');

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
app.use('/api/news/tribun', tribunRoute);

// 4. Endpoint Check Status
app.get('/api/check', (req, res) => {
    res.json({ 
        status: "success", 
        message: "Bangbotz API is ready!",
        author: "BangBotz" 
    });
});

module.exports = app;