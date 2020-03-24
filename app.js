const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Define Session Obj
app.use(session({
    key: 'user_sid',
    secret: 'shhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
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
    host:       'us-cdbr-iron-east-04.cleardb.net',
    user:       'b02d13aa4c36dc',
    password:   '8f54ac2e',
    database:   'heroku_b601b5ee8d9ef28'
});

// Session Getters/Setters
app.get('/getSession', (req, res) => {
    console.log('Session: ' + JSON.stringify(req.session));
    res.send({'username': req.session.user});
});

// Route modules
const homeRoutes = require("./routes/homeRoutes.js")(pool);
const searchRoutes = require("./routes/searchRoutes.js")(pool);
const userRoutes = require("./routes/userRoutes.js")(pool);
const gameRoutes = require("./routes/gameRoutes.js")(pool);

// API Routes
app.use("/home", homeRoutes);
app.use("/search", searchRoutes);
app.use("/game", gameRoutes);
app.use("/user", userRoutes);

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
