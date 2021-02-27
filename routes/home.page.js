//router auth
const { Router } = require('express');

const homePage = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

homePage.get('/homePage/', (req,res) =>{
      const  {currentUser} = req.session;
      res.render('home-page', {currentUser});

  // User.findById(req.params.id)
  //   .then(profile => {
  //     res.render('home-page', profile); //
  //   })
  //   .catch(error => console.log(`Pane no sistema alguém me desconfigurou: ${error}`));
})
module.exports = homePage;