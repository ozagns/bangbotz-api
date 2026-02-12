const express = require('express');
const config = require('../../config');

const router = express.Router();

/**
 * @project BangBotz API
 * @feature Brat Generator (Direct Image)
 * @author BangBotz / ozagns
 */

router.get('/', async (req, res) => {
    const { text, server } = req.query;

    // Kalau gak ada teks, kasih response JSON biar user tau parameternya salah
    if (!text) {
        return res.status(400).json({
            status: false,
            creator: config.creator,
            message: "Masukkan parameter 'text'. Contoh: /api/maker/brat?text=Halo Masyarakat"
        });
    }

    try {
        let resultUrl;
        if (server === '2') {
            resultUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}`;
        } else {
            resultUrl = `https://aqul-brat.hf.space/?text=${encodeURIComponent(text)}`;
        }

        // LANGSUNG REDIRECT KE GAMBAR
        res.redirect(resultUrl);

    } catch (error) {
        res.status(500).json({
            status: false,
            creator: config.creator,
            message: "Gagal memproses gambar Brat."
        });
    }
});

module.exports = router;