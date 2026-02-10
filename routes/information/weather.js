const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config'); // Ambil dari file config

router.get('/', async (req, res) => {
    try {
        const city = req.query.q || 'Yogyakarta';
        // Menggunakan key dari config.js
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${config.weatherKey}&q=${city}&aqi=no`);
        
        res.json({
            status: true,
            creator: config.creator,
            result: response.data
        });
    } catch (e) {
        res.status(400).json({ status: false, message: "Error" });
    }
});

module.exports = router;