const express = require('express');
const url = require('url');
const router = express.Router();

// Default path
router.use('/', (req, res) => {
    const q = url.parse(req.url, true).query;
    res.render('pages/game', {
        'gameid': q['gid'],
        'gamedata': {
            'title': 'Fire Emblem: Three Houses',
            'dor': 'July 25th 2019',
            'dev': 'Intelligent Systems, Nintendo',
            'plat': 'Nintendo Switch',
            'genre': 'Adventure, RPG, Tactics, Turn-Based Strategy',
            'summary': 'Here, order is maintained by the Church of Seiros, which hosts the prestigious Officer’s Academy within its headquarters. You are invited to teach one of its three mighty houses, each comprised of students brimming with personality and represented by a royal from one of three territories. As their professor, you must lead your students in their academic lives and in turn-based, tactical RPG battles wrought with strategic, new twists to overcome. Which house, and which path, will you choose?',
            'favs': 2304,
            'thumb': 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1n8t.jpg',
            'bg': 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/ynbji1swyqkg0co3cgag.jpg',
            'trailer': 'https://www.youtube.com/watch?v=pIUTKOvPc4I',
            'r1': 90,
            'r2': 40,
            'r3': 50,
            'r4': 70,
            'r5': 30,
            'rC': 230,
        }
    });
});

module.exports = router;