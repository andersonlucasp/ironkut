const { Router } = require('express');

const search = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

search.get('/search', (req, res) => {
    res.render('busca')
});

search.post('/search', (req, res) => {
    const { username } = req.body
    User.find({ username }).
    then(users => {
        res.render(`result-search`, { users });


    });
})
module.exports = search;