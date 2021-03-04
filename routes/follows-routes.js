const { Router } = require('express');

const router = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');


router.post('/editProfile/', (req, res) => {
    const { currentUser } = req.session;

    const {
        username,
        lastname,
        relationship,
        state,
        city,
        hobbies,
        interestedin
    } = req.body;

    User.findByIdAndUpdate(currentUser._id, {
            username,
            lastname,
            relationship,
            state,
            city,
            hobbies,
            interestedin
        }, { new: true })
        .then(updateUser => {
            req.session.currentUser = updateUser;
            res.redirect(`/profile/`)
        })
        .catch(error => console.log(`Error while updating your user. Please try again!`));

});