const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const database = require('./database');

const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json()); // Important
app.use(cookieParser());

// Define Session Obj
app.use(session({
    key: 'user_sid',
    secret: 'shhh',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        expires: 3600000
    }
}));

// Check if cookie is still in browser
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    } else {
        next();
    }
});

// Establish our static path
app.use(express.static(path.join(__dirname, "/client/build")));

// Establish database connection
let pool = mysql.createPool({
    connectionLimit: 10,
    host:       process.env.DB_HOST,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASS,
    database:   process.env.DB_DB
});

// Session Getters
app.get('/getSession', (req, res) => {
    console.log(JSON.stringify(req.session));
    const email = req.session.user;
    if (email) {
        database.query(`SELECT username FROM User WHERE user_email='${email}'`, pool)
        .then(result => {
            res.send({'email': req.session.user, 'username': result[0].username});
        }).catch(err => console.error(err));
    } else {
        res.send({});
    }
});

// Check Session, have dashboard redirect to login page if user
// is not logged in
app.get('/dashboard', (req, res, next) => {
    if (!req.session.user | !req.cookies.user_sid) {
        res.redirect('/login');
    } else {
        next();
    }
});

// Route modules
const homeRoutes = require("./routes/homeRoutes.js")(pool);
const searchRoutes = require("./routes/searchRoutes.js")(pool);
const userRoutes = require("./routes/userRoutes.js")(pool);
const gameRoutes = require("./routes/gameRoutes.js")(pool);
const scoreRoutes = require("./routes/scoreRoutes.js")(pool);

// API Routes
app.use("/home", homeRoutes);
app.use("/search", searchRoutes);
app.use("/game", gameRoutes);
app.use("/user", userRoutes);
app.use("/score", scoreRoutes);

// Default Route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Error Handling
app.use((err, req, res, next) => {
    res.status(422).send({error: err._messsage});
});

// Port handling
const port = process.env.PORT || 8000;
app.listen(port);
