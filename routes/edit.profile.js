//router auth
const { Router } = require('express');

const router = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

//get
router.get('/editProfile/', (req, res) => {
    const { currentUser } = req.session;
    res.render('edit/edit-profile', { userToEdit: currentUser });
});

router.post('/editProfile/', (req, res) => {


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
            res.redirect(`/homePage/`)
        })
        .catch(error => console.log(`Error while updating your user. Please try again!`));

});


module.exports = router;