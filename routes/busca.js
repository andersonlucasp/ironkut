//Barra de buscar por username

const {
    Router
} = require('express');

const search = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

search.get('/search', (req, res) => {
    res.render('busca')
});

search.post('/search', (req, res) => {
    const {
        username
    } = req.body
    const {
        currentUser
    } = req.session;
    User.find({
        username
    }).
    then(users => {
        res.render(`result-search`, {
            users,
            currentUser
        });


    });
})
module.exports = search;