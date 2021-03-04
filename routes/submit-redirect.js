const { Router } = require('express');
const submit = new Router();
const mongoose = require('mongoose');
//user model
const User = require('../models/user.model');

submit.get('/profile/:id', async(req, res) => {
    const { currentUser } = req.session;
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('followers')
        res.render('profile', { currentUser, user });
    } catch (error) {
        return next(error);
    }

});



submit.post('/profile/:id', (req, res) => {
    res.redirect('/profile')
});









module.exports = submit;