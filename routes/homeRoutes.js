const express = require("express");
const router = express.Router();

const database = require("../database");


module.exports = function (pool) {
    
    /**
     * GET Random Game
     * Returns a random game's URL
     */
    router.get("/randomGame", async (req, res) => {
        await database.query('SELECT gameID FROM Game', pool)
        .then((result) => {
            if (result.length > 0) {
                const gameID = result[result.length * Math.random() | 0].gameID;
                res.send({'url': `/game/${gameID}`}); 
            } else {
                res.send({'url': '/'});
            }
        }).catch(err => {
            console.error(err);
            res.send({'url': '/'});
        });
    });

    /**
     * GET Most Favorited Game
     * Returns an object that contains a game's ID and title
     */
    router.get("/mostFavorites", (req, res) => {
        database.query(
            'SELECT gameID, COUNT(gameID) AS mostFavorite FROM favorites GROUP BY gameID ORDER BY mostFavorite DESC LIMIT 1', pool
        ).then(result => {
            console.log('Most Favorites', result);
            if (result.length > 0) {
                database.query(`SELECT gameID, title FROM Game WHERE gameID=${result[0].gameID}`, pool)
                .then(result => {
                    res.send(JSON.parse(JSON.stringify(result[0])))
                }).catch(err => console.error(err));
            } else {
                res.send({});
            }
        }).catch(err => console.error(err));
    });

    /**
     * GET Most Popular Game
     * Returns an object that contains a game's ID and title
     */
    router.get("/mostPopular", (req, res) => {
        database.query(
            'SELECT gameID, COUNT(gameID) AS mostPopular FROM scores GROUP BY gameID ORDER BY mostPopular DESC LIMIT 1', pool
        ).then(result => {
            console.log('Most Popular', result);
            if (result.length > 0) {
                database.query(`SELECT gameID, title FROM Game WHERE gameID=${result[0]["gameID"]}`, pool)
                .then(result => {
                    res.send(result[0]);
                }).catch(err => console.error(err));
            } else {
                res.send({});
            }
        }).catch(err => console.error(err));
    });


    router.get("/", (req, res) =>{
        res.send("Home Route");
    });

    return router;
};