//router auth
const {
    Router
} = require('express');

const profile = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

//eu quero começar o curso do 0. como fazer?
profile.get('/profile', (req, res) => {

    const {
        currentUser
    } = req.session;
    res.render('profile', {
        currentUser
    });
});

// Handles the post request for following a user
profile.post('/follow-user/:_id', function(req, res, next) {

    const {
        id
    } = req.params;

    const {
        currentUser
    } = req.session;

    User.findById(currentUser._id).then((updatedUser) => {
        updatedUser.following.push(id);
        updatedUser.save().then(saveUpdate => {
            User.findById(id).then((followerUpdated) => {
                followerUpdated.followers.push(currentUser._id);
                followerUpdated.save().then((saveFollower) => {
                    console.log(saveFollower);
                    res.redirect(`/user-profile/${id}`);
                }).catch(error => console.log(`Error ${error}`));
            }).catch(error => console.log(`Error ${error}`));
            console.log(saveUpdate);
        }).catch(error => console.log(`Error ${error}`))
    }).catch(error => console.log(error, `Voce nao pode seguir esse user`));

});

module.exports = profile;