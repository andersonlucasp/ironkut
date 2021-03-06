const {
    Router
} = require('express');
const select = new Router();
const mongoose = require('mongoose');
//user model
const User = require('../models/user.model');

select.get('/profile/:id', (req, res) => {
    const {
        id
    } = req.params;

    const {
        currentUser
    } = req.session;

    User.findById(id)
        .then((selectedUser) => {
            res.render('user-profile', {
                selectedUser,
                currentUser
            })
        })
        .catch(error => console.log(`Error ${error}`));
});

module.exports = select;