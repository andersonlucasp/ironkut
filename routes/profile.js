//router auth
const { Router } = require('express');

const profile = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');

//eu quero começar o curso do 0. como fazer?
profile.get('/profile/', (req, res) => {
  const { currentUser } = req.session;
  res.render('profile', {currentUser});

// Handles the post request for following a user
profile.post('/follow-user', function(req, res, next) {

  // First, find the user from the user page being viewed
  User.findOne({ username: req.body.username }, function(err, user) {
    user.followers.push(req.user._id);
    let followedUser = user._id;
    user.save(function(err){
        if(err){
           
        }
        else
        {
            // Secondly, find the user account for the logged in user
            User.findOne({ username: req.user.username }, function(err, user) {

                user.following.push(followedUser);
                user.save(function(err){
                    if(err){
                        
                    }
                    else{
                        
                    }
                });
            });
          }
      });
    });
  });


  
    
        

   
    

  


  // User.findById(id)
  //   .then(profile => {
  //     res.render('profile', profile); //
  //   })
  //   .catch(error => console.log(`Pane no sistema alguém me desconfigurou: ${error}`));
});

module.exports = profile;
