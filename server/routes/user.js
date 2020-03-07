const express = require('express');
const url = require('url');
const router = express.Router();

// Default path
router.use('/', (req, res) => {
    res.render('pages/user');
});

module.exports = router;