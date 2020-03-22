const express = require("express");
const router = express.Router();

const database = require("../database");


module.exports = function (pool) {
    
    router.get("/makeSearch", (req, res, next) => {
        const search = req.query.search;
        const filters = req.query.filters;

        // Run query
        pool.query(`SELECT * FROM Game;`, (err, data) => {
            if (err) {
                res.send(err);
                throw err;
            }
            res.send(data);
        });        
    });

    router.get("/", (req, res) =>{
        res.send("Search Route");
    });

    return router;
};