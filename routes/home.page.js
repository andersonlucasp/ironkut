//router auth
const { Router } = require('express');

const homePage = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

homePage.get('/homePage/', (req, res) => {
    const { currentUser } = req.session;
    res.render('home-page', { currentUser });


})
module.exports = homePage;