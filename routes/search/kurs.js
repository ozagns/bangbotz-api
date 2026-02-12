const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');

router.get('/', async (req, res) => {
    const { dari, ke, jumlah } = req.query;

    // Default jika parameter tidak diisi: 1 USD ke IDR
    const from = dari || 'USD';
    const to = ke || 'IDR';
    const amount = jumlah || 1;

    try {
        // Menggunakan API publik yang stabil
        const url = `https://api.exchangerate-api.com/v4/latest/${from.toUpperCase()}`;
        const response = await axios.get(url);
        const data = response.data;

        if (!data.rates[to.toUpperCase()]) {
            return res.status(400).json({ 
                status: false, 
                message: `Mata uang '${to}' tidak didukung.` 
            });
        }

        const rate = data.rates[to.toUpperCase()];
        const hasil = amount * rate;

        res.json({
            status: true,
            creator: config.creator,
            result: {
                dari: from.toUpperCase(),
                ke: to.toUpperCase(),
                jumlah: parseFloat(amount),
                nilai_tukar: rate,
                hasil_konversi: hasil,
                terakhir_update: data.date
            }
        });

    } catch (e) {
        res.status(500).json({ 
            status: false, 
            creator: config.creator,
            message: "Gagal mengambil data kurs mata uang." 
        });
    }
});

module.exports = router;