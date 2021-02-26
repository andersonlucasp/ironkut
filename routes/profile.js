//router auth
const { Router } = require('express');

const profile = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

//eu quero começar o curso do 0. como fazer?
profile.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(profile => {
      res.render('profile', profile); //
    })
    .catch(error => console.log(`Pane no sistema alguém me desconfigurou: ${error}`));
});

module.exports = profile;
