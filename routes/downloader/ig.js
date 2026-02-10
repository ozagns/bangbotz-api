const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: true,
        creator: "ozagns",
        message: "Fitur Instagram sedang disiapkan"
    });
});

module.exports = router;