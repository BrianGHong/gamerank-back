const express = require("express");
const router = express.Router();


module.exports = function (pool) {
    
    router.get("/getgame", (req, res, next) => {
        const gameID = req.query.g;

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
        res.send("Game Route");
    });

    return router;
};