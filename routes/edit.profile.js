//router auth
const { Router } = require('express');

const router = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

//get
router.get('/editProfile/', (req, res) => {
  const  {currentUser} = req.session;
      res.render('home-page', {userToEdit:currentUser});
});

router.post('/editProfile/:id', (req,res) => {
  const { id } = req.params;
  const {
    username,
    lastname,
    relationship,
    state,
    city,
    hobbies,
    interestedin
  } = req.body;

  User.findByIdAndUpdate(id, {
    username,
    lastname,
    relationship,
    state,
    city,
    hobbies,
    interestedin
  },
  {new: true}).then(updateUser => res.redirect(`/profile/${updateUser._id}`)).catch(error => console.log(`Error while updating your user. Please try again!`));
  
});


module.exports = router;