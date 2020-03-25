const express = require("express");
const router = express.Router();

const database = require("../database");


module.exports = function (pool) {
    
    /**
     * GET Random Game
     * Returns a random game's ID
     */
    router.get("/randomGame", async (req, res) => {
        await database.query(
            'SELECT gameID FROM Game', pool
        ).then((result) => {
            res.send(result[result.length * Math.random() | 0]);
        }).catch(err => res.send(err));
    });

    /**
     * GET Most Favorited Game
     * Returns an object that contains a game's ID and title
     */
    router.get("/mostFavorites", (req, res) => {
        database.query(
            'SELECT gameID, COUNT(gameID) AS mostFavorite FROM favorites GROUP BY gameID ORDER BY mostFavorite DESC LIMIT 1', pool
        ).then(result => {
            if (result.length > 0) {
                return database.query(`SELECT gameID, title FROM Game WHERE gameID=${result[0]["gameID"]}`, pool);
            } else {
                return {};
            }
        }).catch(err => res.send({}));
    });

    /**
     * GET Most Popular Game
     * Returns an object that contains a game's ID and title
     */
    router.get("/mostPopular", async(req, res) => {
        await database.query(
            'SELECT gameID, COUNT(gameID) AS mostPopular FROM scores GROUP BY gameID ORDER BY mostPopular DESC LIMIT 1', pool
        ).then(result => {
            return database.query(`SELECT gameID, title FROM Game WHERE gameID=${result[0]["gameID"]}`, pool)
        }).catch(err => res.send(err))
        .then(result => {
            res.send(result[0]);
        }).catch(err => res.send(err));
    });


    router.get("/", (req, res) =>{
        res.send("Home Route");
    });

    return router;
};