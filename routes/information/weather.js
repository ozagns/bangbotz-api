const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');

router.get('/', async (req, res) => {
    try {
        const city = req.query.q;

        // Validasi: Jika user tidak input kota, langsung hentikan proses
        if (!city) {
            return res.status(400).json({
                status: false,
                creator: config.creator,
                message: "Silakan masukkan nama kota! Contoh: ?q=Jakarta"
            });
        }

        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${config.weatherKey}&q=${city}&aqi=no`);
        const data = response.data;

        res.json({
            status: true,
            creator: config.creator,
            result: {
                lokasi: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
                waktu: data.location.localtime,
                kondisi: data.current.condition.text,
                suhu: `${data.current.temp_c}°C`,
                terasa_seperti: `${data.current.feelslike_c}°C`,
                kelembapan: `${data.current.humidity}%`,
                angin: `${data.current.wind_kph} kph`,
                icon: `https:${data.current.condition.icon}`
            }
        });
    } catch (e) {
        res.status(400).json({ 
            status: false, 
            creator: config.creator,
            message: "Kota tidak ditemukan atau permintaan bermasalah" 
        });
    }
});

module.exports = router;