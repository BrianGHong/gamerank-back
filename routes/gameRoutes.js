const express = require("express");
const router = express.Router();

const database = require("../database");

module.exports = function (pool) {

    /**
     * GET METHOD
     * Returns ALL metadata associated with a particular game
     */
    router.get("/getgame/:id", async function(req, res) {
        const gameID = req.params.id;
        let genre=[], dev=[], pub=[], plat=[], gamemode=[];
        let gameObj = {};
        // Query chain to receive all of the data associated with each multi-value detail attribute
        await database.query(`SELECT genre_name FROM Game_details_genre WHERE gameID=${gameID}`, pool)
            .then(rows => {
                for (let i in rows) {
                    genre.push(rows[i]["genre_name"])
                }
                return database.query(`SELECT developer_name FROM Game_details_developers WHERE gameID=${gameID}`, pool)
            }).catch(err => res.send(err))
            .then(rows => {
                for (let i in rows) {
                    dev.push(rows[i]["developer_name"])
                }
                return database.query(`SELECT publisher_name FROM Game_details_publishers WHERE gameID=${gameID}`, pool)
            }).catch(err => res.send(err))
            .then(rows => {
                for (let i in rows) {
                    pub.push(rows[i]["publisher_name"])
                }
                return database.query(`SELECT platform_type FROM Game_details_platforms WHERE gameID=${gameID}`, pool)
            }).catch(err => res.send(err))
            .then(rows => {
                for (let i in rows) {
                    plat.push(rows[i]["platform_type"])
                }
                return database.query(`SELECT gamemode_type FROM Game_details_gamemodes WHERE gameID=${gameID}`, pool)
            }).catch(err => res.send(err))
            .then(rows => {
                for (let i in rows) {
                    gamemode.push(rows[i]["gamemode_type"])
                }
                // FINALLY we query the actual game database for the actual game meta
                return database.query(`SELECT * FROM Game WHERE gameID=${gameID}`, pool);
            }).catch(err => res.send(err))
            // Once we receive the actual data, we can now begin to formulate one, unified game object to return to the client
            .then(rows => {
                gameObj = rows[0];
                gameObj["genre"] = genre;
                gameObj["developers"] = dev;
                gameObj["publishers"] = pub;
                gameObj["platforms"] = plat;
                gameObj["gamemodes"] = gamemode;
                res.send(gameObj);
            }).catch(err => res.send(err));
    });

    /**
     * POST Add/remove game from favorites
     */
    router.post("/updateFavorite/:gid", (req, res) => {
        const email = req.session.user;
        const gid = req.params.gid;
        // ensure user is logged in
        if (email) {
            console.log('User is logged in');
            database.query(`SELECT * FROM favorites WHERE user_email='${email}' AND gameID='${gid}'`, pool)
            .then(result => {
                // If user has not favorited this game
                if (result.length < 1) {
                    console.log("FAVORITE");
                    database.query(`INSERT INTO favorites VALUES (${gid}, '${email}')`, pool).catch(err => {console.error(err)});
                // If user has ALREADY favorited this game
                } else {
                    console.log("UNFAVORITE");
                    database.query(`DELETE FROM favorites WHERE user_email='${email}' AND gameID='${gid}'`, pool).catch(err => {console.error(err)});
                }
            }).catch(err => console.error(err));
        } else {
            console.log('User is NOT logged in');
            res.send({});
        }
    });

    /**
     * GET Check if user has favorited the current game
     */
    router.get("/isFavorite/:gid", (req, res) => {
        const email = req.session.user;
        const gid = req.params.gid;
        if (email) {
            database.query(`SELECT * FROM favorites WHERE user_email='${email}' AND gameID='${gid}'`, pool)
            .then(result => {
                if (result.length > 0) {
                    res.send({"isFavorite": true});
                } else {
                    res.send({});
                }
            }).catch(err => {console.error(err)});
        } else {
            res.send({});
        }
    });

    /**
     * POST Count number of favorites
     */
    router.get("/favCount/:gid", (req, res) => {
        const gid = req.params.gid;
        database.query(`SELECT COUNT(*) as favCount FROM favorites WHERE gameID=${gid}`, pool)
        .then(result => {
            res.send({"favCount": result[0].favCount});
        })
        .catch(err => console.error(err));
    });

    /**
     * POST Give a game a score (update score if u already did so)
     */
    router.post("/scoreGame", (req, res) => {
        
    });

    return router;
};
