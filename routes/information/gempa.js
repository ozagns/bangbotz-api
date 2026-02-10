const express = require('express');
const router = express.Router();
const axios = require('axios');

// Endpoint Info Gempa Terkini (M 5.0+)
router.get('/terkini', async (req, res) => {
    try {
        const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
        const gempa = response.data.Infogempa.gempa;
        
        res.json({
            status: true,
            creator: "BangBotz",
            result: {
                tanggal: gempa.Tanggal,
                jam: gempa.Jam,
                datetime: gempa.DateTime,
                magnitudo: gempa.Magnitude,
                kedalaman: gempa.Kedalaman,
                koordinat: gempa.Coordinates,
                lokasi: gempa.Wilayah,
                potensi: gempa.Potensi,
                dirasakan: gempa.Dirasakan,
                shakemap: `https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}`
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: "BangBotz",
            message: "Gagal mengambil data gempa terkini" 
        });
    }
});

// Endpoint 15 Gempa Terbaru (M 5.0+)
router.get('/list', async (req, res) => {
    try {
        const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json');
        const listGempa = response.data.Infogempa.gempa;
        
        const result = listGempa.map((item) => ({
            tanggal: item.Tanggal,
            jam: item.Jam,
            magnitudo: item.Magnitude,
            kedalaman: item.Kedalaman,
            lokasi: item.Wilayah,
            potensi: item.Potensi
        }));

        res.json({
            status: true,
            creator: "BangBotz",
            total: result.length,
            result
        });
    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: "BangBotz",
            message: "Gagal mengambil daftar gempa" 
        });
    }
});

module.exports = router;