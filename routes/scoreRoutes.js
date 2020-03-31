const express = require("express");
const router = express.Router();

const database = require("../database");

module.exports = function (pool) {

    /**
     * GET Game aggregate score
     */
    router.get(`/getGameScore/:gid`, (req, res) => {
        const gid = req.params.gid;
        database.query(`SELECT * FROM scores WHERE gameID=${gid}`, pool)
        .then(result => {
            const userCount = result.length;
            let scoreObj = {
                r1: 0.0,
                r2: 0.0,
                r3: 0.0,
                r4: 0.0,
                r5: 0.0,
                users: userCount
            };
            if (result.length > 0) {
                for (let i=0; i<userCount; i++) {
                    scoreObj.r1 += result[i].s_story;
                    scoreObj.r2 += result[i].s_gameplay;
                    scoreObj.r3 += result[i].s_art;
                    scoreObj.r4 += result[i].s_difficulty;
                    scoreObj.r5 += result[i].s_value;
                }
                scoreObj.r1 /= userCount;
                scoreObj.r2 /= userCount;
                scoreObj.r3 /= userCount;
                scoreObj.r4 /= userCount;
                scoreObj.r5 /= userCount;
            }
            res.send(scoreObj);
        }).catch(err => {
            res.send({
                r1: 0.0,
                r2: 0.0,
                r3: 0.0,
                r4: 0.0,
                r5: 0.0,
                users: 0
            });
            console.error(err);
        });
    });

    /**
     * POST Give/update game score
     */
    router.post(`/postGameScore`, (req, res) => {
        const email = req.session.user;
        if (email) {
            // Check if user had previously rated this game
            database.query(`SELECT * FROM scores WHERE user_email='${email}' AND gameID=${req.body.gameID}`, pool)
            .then(result => {
                // If user HAS rated
                if (result.length > 0) {
                    database.query(`UPDATE scores SET gameID=${req.body.gameID}, user_email='${email}', s_story=${req.body.r1}, s_gameplay=${req.body.r2}, s_art=${req.body.r3}, s_difficulty=${req.body.r4}, s_value=${req.body.r5} WHERE user_email='${email}' AND gameID=${req.body.gameID}`, pool)
                    .then(result2 => {
                        res.send({'success': 'Score updated!'});
                    }).catch(err => console.error(err));
                // If user HASNT rated
                } else {
                    database.query(`INSERT INTO scores VALUES (${req.body.gameID}, '${email}', ${req.body.r1}, ${req.body.r2}, ${req.body.r3}, ${req.body.r4}, ${req.body.r5})`, pool)
                    .then(result2 => {
                        res.send({'success': 'Score submitted!'});
                    }).catch(err => console.error(err));
                }
            }).catch(err => {
                console.error(err);
                res.send({'error': 'An unknown error as occurred.'});
            });
        } else {
            res.send({'error': 'Must be logged in in order to score this game.'});
        }
    });

    return router;
};