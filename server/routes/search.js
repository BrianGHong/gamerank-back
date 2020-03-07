const express = require('express');
const url = require('url');
const router = express.Router();

// Default path
router.use('/', (req, res) => {
    const q = url.parse(req.url, true).query;
    res.render('pages/search', {
        'search': q['s'],
        
    });
});

module.exports = router;