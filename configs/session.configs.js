const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = app => {
    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 60000,
                sameSite: false
            },
            store: new MongoStore({
                //<== ADDED !!!
                mongooseConnection: mongoose.connection,
                //ttl => time to live
                ttl: 14 * 24 * 60 * 60
            })
        })
    );
};