import express from 'express';
import config from '../../config.js'; // Untuk creator: config.creator

const router = express.Router(); // Deklarasi router

router.get('/', async (req, res) => {
    try {
        res.json({
            status: true,
            creator: config.creator, // Tetap pakai branding BangBotz
            result: "Berhasil!"
        });
    } catch (e) {
        res.json({ status: false, creator: config.creator, message: e.message });
    }
});

export default router; // Pastikan di-export untuk dipakai di index.js