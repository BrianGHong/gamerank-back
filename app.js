const http = require('http');
const url = require('url');
const path = require('path');
const bodyParser = require("body-parser");

const express = require('express');
const app = express();

const homeRoutes = require("./routes/homeRoutes.js");

// Establish our static path
app.use(express.static(path.join(__dirname, "/client/build")));

// API Routes
app.use("/api/homeRoutes", homeRoutes);

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
