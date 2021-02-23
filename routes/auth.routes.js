//router auth
const { Router } = require('express');
const router = new Router();
const mongoose = require('mongoose');
//user model
const User = require('../models/user.model');




//bcrypt
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

//get de signup
router.get('/signup', (req, res, next) => res.render('auth/signup'));

//post signup
router.post('/signup', (req, res, next) => {


    const { username, lastname, password, email, birthday, country, genre } = req.body;

    if (!username || !lastname || !password || !email || !birthday || !country || !genre) {
        res.render('auth/signup', { errorMessage: "Please, check mandatory fields" });
        return;
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    console.log(regex.test(password))
    if (!regex.test(password)) {
        res.status(500).render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }
    bcrypt.genSalt(bcryptSalt)
        .then(salt => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
            User.create({
                    username,
                    lastname,
                    genre,
                    country,
                    birthday,
                    email,
                    passwordHash: hashedPassword
                })
                .then((userFromDb) => {
                    res.redirect('/userProfile')
                })
                .catch((error) => {
                    if (error instanceof mongoose.Error.ValidationError) {
                        console.log(error)
                        res.status(500).render('auth/signup', { errorMessage: error.message });
                    } else if (error.code === 11000) {
                        res.status(500).render('auth/signup', {
                            errorMessage: 'Email need to be unique. Either username or email is already used.'
                        });
                    } else {
                        next(error);
                    }
                });
        }).catch((error) => console.error(error))

});

router.get('/login', (req, res, next) => {
    res.render('auth/login')
});

router.post('/login', (req, res, next) => {

    const { email, password } = req.body
    if (email === '' || password === '') {
        res.render('auth/login', {
            errorMessage: 'Please enter both, email and password to login.'
        });
        return;

    };
    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcrypt.compareSync(password, user.passwordHash)) {
                req.session.currentUser = user;
                res.redirect('/userProfile');
            } else {
                res.render('auth/login', { errorMessage: 'Incorrect password.' });
            }
        })
        .catch(error => next(error));
});

module.exports = router;