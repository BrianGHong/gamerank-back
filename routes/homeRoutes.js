const express = require("express");
const router = express.Router();

const database = require("../database");


module.exports = function (pool) {
    
    router.get("/randomGame", (req, res, next) => {

        // Run query
        pool.query(`SHOW TABLES;`, (err, data) => {
            if (err) {
                res.send(err);
                throw err;
            }
            res.send(data);
        });        
    });

    router.get("/", (req, res) =>{
        res.send("Home Route");
    });

    return router;
};