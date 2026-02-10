const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
    <html>
        <body style="background: #121212; color: white; font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>Bangbotz API</h1>
            <p>Status: <span style="color: #00ff00;">Online 🕑</span></p>
            <hr style="width: 200px; border: 1px solid #333;">
            <p>Created by ozagns</p>
        </body>
    </html>
    `);
});

app.get('/api/check', (req, res) => {
    res.json({ status: "success", message: "Bangbotz API is ready! 🕑" });
});

module.exports = app;