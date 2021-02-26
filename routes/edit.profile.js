//router auth
const { Router } = require('express');

const router = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

//get
router.get('/editProfile/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(userToEdit => {
      res.render('edit/edit-profile', userToEdit); // <-- add this line
    })
    .catch(error => console.log(`Error while getting a single book for edit: ${error}`));
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