const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const database = require("../database");


module.exports = function (pool) {

    // Check if Email address of Username already exists in the database
    const checkExists = async (req, res, next) => {
        if (!req.body.email || !req.body.username || !req.body.password) {
            res.redirect('/user/register?error=Please enter all fields before registering.')
        } else {
            const sql = `SELECT * FROM User WHERE '${req.body.email}'=user_email`;
            await database.query(sql, pool)
            .then(async result => {
                if (result.length == 0) {
                    const sql = `SELECT * FROM User WHERE '${req.body.username}'=username`;
                    await database.query(sql, pool)
                    .then(result => {
                        if (result.length == 0) {
                            next();
                        } else {
                            res.redirect('/register?error=Please choose a unique username!')        
                        }
                    }).catch(err => console.error(err));
                } else {
                    res.redirect('/register?error=Please choose a unique email!')
                }
            }).catch(err => console.error(err));
        }   
    }

    /**
     * POST Registers a user onto the site
     */
    router.post('/register', checkExists, async (req, res) => {
        // Ensure Password is longer than 8 characters
        if (req.body.password.length < 8) {
            res.redirect('/register?error=Password must be at least 8 characters');
        // Ensure email address is valid
        } else if (!((/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(req.body.email))) {
            res.redirect('/register?error=Entered invalid email address');
        } else if (req.body.username.length < 5){
            res.redirect('/register?error=Username must be longer than 4 characters');
        } else {
            // Hash password
            await database.query(`INSERT INTO User VALUES ('${req.body.email}', '${req.body.username}', '${bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))}')`, pool)
            .then(user => {       
                res.redirect('/login?success=Account Created!');
            })
            .catch(err => {
                console.error(err);
            });
        }
    });

    // Check if user entered in correct email and password
    const checkUser = async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            res.redirect('/login?error=Please enter all fields before logging in.')
        } else {
            const sql = `SELECT * FROM User WHERE user_email='${req.body.email}'`;
            await database.query(sql, pool)
            .then(async result => {
                if (result.length > 0) {
                    if (bcrypt.compareSync(req.body.password, result[0]["pass"]) === true) {
                        next();
                    } else {
                        res.redirect('/login?error=Incorrect username or password');
                        console.log(result[0]["pass"]);
                    }
                } else {
                    res.redirect('/login?error=Incorrect username or password');
                }
            }).catch(err => console.error(err));
        }   
    }

    /**
     * POST Logs in a user onto the site
     */
    router.post('/login', checkUser, (req, res) => {
        req.session.user = req.body.email;
        console.log("Session Made!");
        res.redirect('/dashboard');
    });

    /**
     * POST Logs a user out of the site
     */
    router.post('/logout', (req, res) => {
        console.log('Logged out!');
        res.clearCookie('user_sid');
        res.redirect('/login');
    });

    /**
     * GET User's Favorites List
     */
    router.get('/getUserFavorites', (req, res) => {
        const email = req.session.user;
        if (email) {
            database.query(`SELECT gameID, title, cover_details FROM favorites NATURAL JOIN Game WHERE user_email='${email}'`, pool)
            .then(result => {
                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send([]);
                }
            }).catch(err => {console.error(err)});
        } else {
            res.send([]);
        }
    });

    /**
     * POST Update Username
     */
    router.post('/updateUsername', (req, res) => {
        const email = req.session.user;
        if (email) {
            if (req.body.username.length > 4) {
                database.query(`SELECT * FROM User WHERE username='${req.body.username}'`, pool)
                .then(result => {
                    if (result.length == 0) {
                        database.query(`UPDATE User SET username='${req.body.username}' WHERE user_email='${req.session.user}'`, pool)
                        .then(result => {
                            res.redirect('/dashboard?success=Username updated!');
                        }).catch(err => console.error(err))
                    } else {
                        res.redirect('/dashboard?error=That username has already been taken!');
                    }
                }).catch(err => console.error(err));
            } else {
                res.redirect('/dashboard?error=Username must be longer than 5 characters');
            }
        } else {
            res.redirect('/dashboard?error=An unknown error has occurred');
        }
    });

    return router;
};