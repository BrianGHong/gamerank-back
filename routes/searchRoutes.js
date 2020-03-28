const express = require("express");
const router = express.Router();

const database = require("../database");


module.exports = function (pool) {
    
    /**
     * Make Search
     */
    router.get("/conductSearch/:s", (req, res) => {
        let search = req.params.s;
        // Run query
        if (search === 'all') {
            console.log('all search');
            database.query(`SELECT gameID, title, cover_details FROM Game`, pool)
            .then(result => {
                console.log((result));
                res.send(result);
            }).catch(err => {console.error(err); res.send([])});
        } else {
            database.query(`SELECT gameID, title, cover_details FROM Game WHERE title='${search}'`, pool)
            .then(result => {
                console.log(result);
                res.send(result);
            }).catch(err => {console.error(err); res.send([])});
        }
    });

    return router;
};