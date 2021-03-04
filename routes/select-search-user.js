const { Router } = require('express');
const select = new Router();
const mongoose = require('mongoose');
//user model
const User = require('../models/user.model');

select.get('/profile/:id', (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .then(userToFind => {
            console.log(userToFind)
            res.render('selectUserFind');
        })
        .catch(error => console.log(`Error ${error}`));
});

module.exports = select;