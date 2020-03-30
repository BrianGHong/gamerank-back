const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const database = require("../database");


module.exports = function (pool) {

    // Check if Email address of Username already exists in the database
    const checkExists = async (req, res, next) => {
        console.log('checkExists middleware starting...');
        console.log(req.body);
        if (!req.body.email || !req.body.username || !req.body.password) {
            console.log('ERROR: User did not enter all fields');
            res.send({'error': 'Please enter all fields before registering'});
        } else {
            const sql = `SELECT * FROM User WHERE '${req.body.email}'=user_email`;
            await database.query(sql, pool)
            .then(async result => {
                if (result.length == 0) {
                    const sql = `SELECT * FROM User WHERE '${req.body.username}'=username`;
                    await database.query(sql, pool)
                    .then(result => {
                        if (result.length == 0) {
                            console.log('checkExists passed!');
                            next();
                        } else {
                            res.send({'error': 'Please choose a unique username!'})        
                        }
                    }).catch(err => {
                        console.error(err);
                        res.send({'error': 'Unknown error has occurred. Please contact administrator.'});
                    });
                } else {
                    res.send({'error': 'Please choose a unique email!'})
                }
            }).catch(err => {
                console.error(err);
                res.send({'error': 'Unknown error has occurred. Please contact administrator.'});
            });
        }   
    }

    /**
     * POST Registers a user onto the site
     */
    router.post('/register', checkExists, async (req, res) => {
        // Ensure Password is longer than 8 characters
        console.log('/register route');
        if (req.body.password.length < 8) {
            console.log('ERROR: Password Length');
            res.send({'error': 'Password must be at least 8 characters'});
        // Ensure email address is valid
        } else if (!((/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(req.body.email))) {
            console.log('ERROR: Invalid Email');
            res.send({'error': 'Entered invalid email address'})
        } else if (req.body.username.length < 5){
            console.log('ERROR: Username Length');
            res.send({'error': 'Username must be longer than 4 characters'});
        } else {
            // Hash password
            await database.query(`INSERT INTO User VALUES ('${req.body.email}', '${req.body.username}', '${bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))}')`, pool)
            .then(user => {       
                console.log('REGISTRATION SUCCESSFUL!');
                res.send({'success': 'Registered successfully!'});
            })
            .catch(err => {
                console.error(err);
                res.send({'error': 'Unknown error has occurred. Please contact administrator.'});
            });
        }
    });

    // Check if user entered in correct email and password
    const checkUser = async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            res.send({'error': 'Please enter all fields before loggin in'});
        } else {
            const sql = `SELECT * FROM User WHERE user_email='${req.body.email}'`;
            await database.query(sql, pool)
            .then(async result => {
                if (result.length > 0) {
                    if (bcrypt.compareSync(req.body.password, result[0]["pass"]) === true) {
                        next();
                    } else {
                        res.send({'error': 'Incorrect username or password'});
                    }
                } else {
                    res.send({'error': 'No account with that email exists'});
                }
            }).catch(err => {
                res.send({'error': 'An unknown error has occurred. Please contact administrator.'}); //JSON.stringify(err)});
                console.error(err);
            });
        }   
    }

    /**
     * POST Logs in a user onto the site
     */
    router.post('/login', checkUser, (req, res) => {
        req.session.user = req.body.email;
        console.log("Session Made!", req.session.user);
        database.query(`SELECT * FROM User WHERE user_email='${req.body.email}'`, pool)
        .then(result => {
            if (result[0].username) {
                res.send({'success': result[0].username});
            } else {
                res.send({'success': ''})
            }
        }).catch(err => {
            res.send({'success': ''})
            console.error(err);
        })
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
            if (req.body.newUsername.length > 4) {
                database.query(`SELECT * FROM User WHERE username='${req.body.newUsername}'`, pool)
                .then(result => {
                    if (result.length == 0) {
                        database.query(`UPDATE User SET username='${req.body.newUsername}' WHERE user_email='${req.session.user}'`, pool)
                        .then(result => {
                            res.send({'success': 'Username updated!'});
                        }).catch(err => console.error(err))
                    } else {
                        res.send({'error': 'That username has already been taken!'});
                    }
                }).catch(err => console.error(err));
            } else {
                res.send({'error': 'Username must be longer than 5 characters'});
            }
        } else {
            console.log('User is not logged in');
            res.send({'error': 'Unknown error has occurred. Please contact administrator'});
        }
    });

    return router;
};