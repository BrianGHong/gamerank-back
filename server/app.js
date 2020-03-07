const http = require('http');
const url = require('url');
const path = require('path');
const express = require('express');
const app = express();


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

// Public directory
app.use(express.static(__dirname + '/public'));


// Routes
const search = require('./routes/search.js');
const game = require('./routes/game.js');
const user = require('./routes/user.js');

app.use('/search', search);
app.use('/game', game);
app.use('/user', user);


// Default Route
app.use('*', (req, res) => {
    res.render('pages/index');
});


// Port handling
const port = process.env.PORT || 8080;
app.listen(port);
