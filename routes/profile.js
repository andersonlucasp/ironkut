//router auth
const { Router } = require('express');

const profile = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

//eu quero começar o curso do 0. como fazer?
profile.get('/profile/', (req, res) => {
    const { currentUser } = req.session;
    res.render('profile', { currentUser });

});




module.exports = profile;