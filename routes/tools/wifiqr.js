const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/', async (req, res) => {
    try {
        const { ssid, pw, tip } = req.query;

        // Validasi minimal ada Nama WiFi (SSID)
        if (!ssid) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "Masukkan parameter ssid! Contoh: ?ssid=MyWifi&pw=12345678&tip=WPA"
            });
        }

        // Tipe enkripsi default adalah WPA kalau tidak diisi
        const encryption = tip || 'WPA';
        const password = pw || '';
        
        // Susun format string WiFi QR sesuai standar
        const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};H:false;;`;
        
        // Link ke QRServer
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(wifiString)}`;

        res.json({
            status: true,
            creator: config.creator,
            result: {
                nama_wifi: ssid,
                tipe: encryption,
                format_raw: wifiString,
                url: qrUrl
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal membuat WiFi QR" 
        });
    }
});

module.exports = router;