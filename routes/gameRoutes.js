const express = require("express");
const router = express.Router();


module.exports = function (pool) {
    
    router.get("/getgame/:id", (req, res) => {
        const gameID = req.params.id;

        /**
         * Helper method: makes queries to each detail table, returning its object properties
         * @param {*} attribute column name
         * @param {*} table details table
         * @param {*} gid game ID
         */
        function getDeet(attribute, table, gid) {
            pool.query(`SELECT ${attribute} FROM ${table} WHERE gameID = ${gid}`, (err, data) => {
                if (err) {
                    throw err;
                }
                // Iterate if there are multiple attributes
                let ret = {};
                try {
                    for (let i=0; i<data.length; i++) {
                        const ele = JSON.parse(JSON.stringify(data[i]));
                        ret[`${i}`] = ele[attribute];
                    }
                    console.log(ret);
                    return ret;

                } catch(err) {
                    console.error(err);
                    return null;
                }
            });
        }

        const gameObj = {
            "details_genre": JSON.parse(JSON.stringify(getDeet('genre_name', 'Game_details_genre', gameID))),
            "details_developers": getDeet('developer_name', 'Game_details_developers', gameID),
            "details_publishers": getDeet('publisher_name', 'Game_details_publishers', gameID),
            "details_platforms": getDeet('platform_type', 'Game_details_platforms', gameID)
        };
        
        // Run query
        const sql = `SELECT * FROM Game WHERE gameID = ${gameID}`;
        pool.query(sql, (err, data) => {
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
