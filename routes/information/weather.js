const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config'); // Ambil dari file config

router.get('/', async (req, res) => {
    try {
        const city = req.query.q || 'Yogyakarta';
        // Menggunakan key dari config.js
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${config.weatherKey}&q=${city}&aqi=no`);
        
        const data = response.data; // Simpan data mentah ke variabel

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
                icon: `https:${data.current.condition.icon}` // Ditambah https agar gambar bisa diproses bot
            }
        });
    } catch (e) {
        // Pesan error lebih informatif jika kota tidak ditemukan
        res.status(400).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal mengambil data cuaca." 
        });
    }
});

module.exports = router;