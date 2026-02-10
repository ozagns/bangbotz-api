const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json({
        status: true,
        creator: "ozagns",
        message: "IG Downloader is under maintenance"
    });
});

module.exports = router;