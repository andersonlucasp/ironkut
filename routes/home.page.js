//router auth
const { Router } = require('express');

const homePage = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');
const Post = require('../models/post.model');

homePage.get('/homePage/', async(req,res) =>{
      const  {currentUser} = req.session;
      try {
        const postsFromDb = await Post.find();
        res.render('home-page', {currentUser, postsFromDb});
      } catch (error) {
        return next(error);
      }     

});

      


  // User.findById(req.params.id)
  //   .then(profile => {
  //     res.render('home-page', profile); //
  //   })
  //   .catch(error => console.log(`Pane no sistema alguém me desconfigurou: ${error}`));

module.exports = homePage;