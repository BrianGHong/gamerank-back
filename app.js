const path = require('path');
const mysql = require('mysql');
const bodyParser = require("body-parser");

const express = require('express');
const app = express();

// Establish our static path
app.use(express.static(path.join(__dirname, "/client/build")));

// Establish database connection
let pool = mysql.createPool({
    connectionLimit: 10,
    host:       'us-cdbr-iron-east-04.cleardb.net',
    user:       'b02d13aa4c36dc',
    password:   '8f54ac2e',
    database:   'heroku_b601b5ee8d9ef28',
});

// Route modules
const homeRoutes = require("./routes/homeRoutes.js")(pool);
const searchRoutes = require("./routes/searchRoutes.js")(pool);
const userRoutes = require("./routes/userRoutes.js")(pool);
const gameRoutes = require("./routes/gameRoutes.js")(pool);

// API Routes
app.use("/api/home", homeRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/user", userRoutes);

app.get("/api", (req, res) => {
    res.send("Welcome to the GameGauge API!");
});

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
