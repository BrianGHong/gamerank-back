const express = require("express");
const router = express.Router();


module.exports = function (pool) {
    
    router.get("/getUser", (req, res, next) => {

        // Run query
        pool.query(`SELECT * FROM User;`, (err, data) => {
            if (err) {
                res.send(err);
                throw err;
            }
            res.send(data);
        });        
    });

    router.get("/", (req, res) =>{
        res.send("User Route");
    });

    return router;
};