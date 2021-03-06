//router auth
const {
  Router
} = require('express');

const homePage = new Router();
const mongoose = require('mongoose');

//user model
const User = require('../models/user.model');
const Post = require('../models/post.model');
const router = require('./auth.routes');
const {
  create
} = require('../models/user.model');

homePage.get('/homePage/', async (req, res) => {
  const {
    currentUser
  } = req.session;
  try {
    const postsFromDb = await Post.find().populate('userID')
    res.render('home-page', {
      currentUser,
      postsFromDb
    });
  } catch (error) {
    return next(error);
  }

});

homePage.post('/post', (req, res) => {
  const {
    message
  } = req.body;
  const {
    currentUser
  } = req.session;
  Post.find()
    .then((postsFromDb) => {
      if (message === '') {
        const errorMessage = 'Please, type someting'
        res.render('home-page', {
          errorMessage,
          currentUser,
          postsFromDb
        })
        return;
      }
      Post.create({
          userID: currentUser._id,
          message
        })
        .then((postCreated) => {
          console.log(postCreated)
          res.redirect('/homePage/')

        })
    });

});

module.exports = homePage;