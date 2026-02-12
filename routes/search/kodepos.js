const express = require('express');
const axios = require('axios');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Kode Pos Indonesia Search
 * @author ozagns
 */

router.get('/', async (req, res) => {
    const query = req.query.q;

    // Peka terhadap input kosong
    if (!query) {
        return res.status(400).json({
            status: false,
            creator: config.creator,
            message: "Masukkan nama daerah atau kode pos! Contoh: ?q=Kalimandi atau ?q=53411"
        });
    }

    try {
        // Request ke server sumber
        const apiResponse = await axios.get(`https://kodepos.vercel.app/search?q=${encodeURIComponent(query)}`);
        const responseData = apiResponse.data;

        // Normalisasi data hasil scraping
        const finalResults = responseData.data || responseData;

        if (finalResults && finalResults.length > 0) {
            res.json({
                status: true,
                creator: config.creator,
                count: finalResults.length,
                result: finalResults.map(item => ({
                    kecamatan: item.district || item.kecamatan,
                    kelurahan: item.village || item.kelurahan,
                    kodepos: item.code || item.kodepos,
                    kota: item.city || item.kota,
                    provinsi: item.province || item.provinsi
                }))
            });
        } else {
            res.status(404).json({
                status: false,
                creator: config.creator,
                message: `Pencarian '${query}' tidak ditemukan.`
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal menghubungkan ke database kode pos. Coba lagi nanti."
        });
    }
});

module.exports = router;