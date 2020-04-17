const express = require("express");
const router = express.Router();

const database = require("../database");


module.exports = function (pool) {
    
    /**
     * Make Search
     */
    router.get("/conductSearch/:s/:f", (req, res) => {
        let search = req.params.s;
        let filter = req.params.f;
        console.log(`/conductSearch/${search}/${filter}`)

        let query, propname;
        switch (filter) {
            case ('genre'):
                query = ['SELECT DISTINCT(gameID), genre_name, title, cover_details FROM game_details_genre NATURAL JOIN Game', ''];
                propname = ['genre_name', ''];
                break;
            case ('company'):
                query = ['SELECT DISTINCT(gameID), developer_name, title, cover_details FROM game_details_developers NATURAL JOIN Game', 'SELECT DISTINCT(a.gameID), publisher_name, title, cover_details FROM game_details_publishers AS a NATURAL JOIN Game'];
                propname = ['developer_name', 'publisher_name'];
                break;
            default:
                query = ['SELECT gameID, title, cover_details FROM Game', ''];
                propname = ['title', ''];
                break;
        }

        // Remove duplicate games from an array
        const removeDuplicateGames = (arr) => {
            return arr.filter((ele, index, self) => 
                self.findIndex((t) => {
                    return (t.gameID === ele.gameID);
                }) === index);
        }

        // Run query
        if (search === 'all') {
            database.query(query[0], pool)
            .then(result => {
                if (query[1] !== '') {
                    database.query(query[1], pool)
                    .then(result2 => {
                        let arr = result;
                        arr = arr.concat(result2);
                        res.send(removeDuplicateGames(arr));

                    }).catch(err => {console.error(err); res.send([])});
                } else {
                    res.send(removeDuplicateGames(result));
                }
            }).catch(err => {console.error(err); res.send([])});
        } else {
            const sql = `${query[0]} WHERE ${propname[0]} LIKE '%${search}%'`;
            database.query(sql, pool)
            .then(result => {
                if (query[1] !== '') {
                    database.query(`${query[1]} WHERE ${propname[1]} LIKE '%${search}%'`, pool)
                    .then(result2 => {
                        let arr = result;
                        arr = arr.concat(result2);                  
                        res.send(removeDuplicateGames(arr));

                    }).catch(err => {console.error(err); res.send([])});
                } else {
                    console.log(result);
                    res.send(removeDuplicateGames(result));
                }
            }).catch(err => {console.error(err); res.send([])});
        }
    });

    /**
     * GET Genres of a game
     */
    router.get("/getGenres/:gid", (req, res) => {
        // Remove duplicate games from an array
        const unique = (value, index, self) => {
            return self.indexOf(value) === index;
          }
          
        const gid = req.params.gid;
        database.query(`SELECT genre_name FROM game_details_genre WHERE gameID=${gid}`, pool)
        .then(result => {
            res.send(result.filter(unique));
        }).catch(err => console.error(err));
    });

    return router;
};