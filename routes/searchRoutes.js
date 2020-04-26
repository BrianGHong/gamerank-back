const express = require("express");
const router = express.Router();

const database = require("../database");


module.exports = function (pool) {
    
    /**
     * Make Search
     */
    router.get("/conductSearch/:s/:f/:p", (req, res) => {
        let search = req.params.s;
        let filter = req.params.f;
        let page = req.params.p;
        console.log(`/conductSearch/${search}/${filter}/${page}`)

        const perPage = 15;
        const offset = perPage * (page - 1);
        console.log(`Results per page: ${perPage} \n Offset: ${offset}`);

        let query, countQuery, propname;
        switch (filter) {
            case ('genre'):
                query = 'SELECT DISTINCT(gameID), genre_name, dor_details, title, cover_details FROM game_details_genre NATURAL JOIN Game';
                countQuery = 'SELECT COUNT(*) AS count FROM game_details_genre NATURAL JOIN Game';
                propname = 'genre_name';
                break;
            case ('developer'):
                query = 'SELECT DISTINCT(gameID), developer_name, dor_details, title, cover_details FROM game_details_developers NATURAL JOIN Game';
                countQuery = 'SELECT COUNT(*) AS count FROM game_details_developers NATURAL JOIN Game';
                propname = 'developer_name';
                break;
            case ('publisher'):
                query = 'SELECT DISTINCT(gameID), publisher_name, dor_details, title, cover_details FROM game_details_publishers NATURAL JOIN Game';
                countQuery = 'SELECT COUNT(*) AS count FROM game_details_publishers NATURAL JOIN Game';
                propname = 'publisher_name';
                break;
            default:
                query = 'SELECT gameID, title, dor_details, cover_details FROM Game';
                countQuery = 'SELECT COUNT(*) AS count FROM Game';
                propname = 'title';
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
        const sql = `${query} WHERE ${propname} LIKE '%${search}%' LIMIT ${offset}, ${perPage}`;
        database.query(sql, pool)
        .then(resultQuery => {
            // Count number of pages
            database.query(`${countQuery} WHERE ${propname} LIKE '%${search}%'`, pool)
            .then(resultCount => {
                console.log(resultCount);
                res.send({
                    lastPage: Math.ceil(resultCount[0].count / perPage),
                    results: removeDuplicateGames(resultQuery)
                });
            }).catch(err => {console.error(err); res.send({
                lastPage: 0,
                results: []
            })});
        }).catch(err => {console.error(err); res.send({
            lastPage: 0,
            results: []
        })});
    });

    return router;
};