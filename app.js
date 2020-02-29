const http = require('http');
const url = require('url');
const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.use(express.static(__dirname + '/public'));

app.use('/search', (req, res) => {
    const q = url.parse(req.url, true).query;
    res.render('pages/search', {
        'search': q['s'],
    });
});

app.use('*', (req, res) => {
    res.render('pages/index');
});

app.listen(port);