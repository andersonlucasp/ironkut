const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;


/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});


/* GET Signup */
router.get('/signup', (req, res, next) =>
    res.render('signup'));


/* POST Signup */
router.post('/signup', (req, res, next) => {
    const { email, username, password, lastname } = req.body
    console.log('>>>>>> here', req.body)

    if (!email || !username || !password || !lastname) {
        res.render('signup', { errorMessage: 'Todos os campos são obrigatórios' });
        return
    }
    /* Hash da senha */
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    console.log(regex.test(password))
    if (!regex.test(password)) {
        res.status(500).render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    bcryptjs.genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then((hasedPassword) => {
            User.create({
                    username,
                    lastname,
                    email,
                    passWordHash: hasedPassword
                })
                .then((userFromDb) => {
                    res.redirect('/userProfile')
                })
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/signup', { errorMessage: error.message });
            } else if (error.code === 11000) {
                res.status(500).render('auth/signup', {
                    errorMessage: 'Username and email need to be unique. Either username or email is already used.'
                });
            } else {
                next(error);
            }
        });
});

/* GET login */
router.get('/login', (req, res, next) =>
    res.render('login'));


/* POST login */
router.post('/login', (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.render('login', {
            errorMessage: 'Please enter both, email and password to login.'
        });
        return
    }
    User.findOne({ email })
        .then(user => {
            console.log(user)
            if (!user) {
                res.render('login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcryptjs.compareSync(password, user.passWordHash)) {
                res.render('user-profile', { user })
                req.session.currentUser = user;
                res.redirect('/userProfile');;
            } else {
                res.render('auth/login', { errorMessage: 'Incorrect password.' });
            }
        })

    .catch(error => next(error));
});



module.exports = router;