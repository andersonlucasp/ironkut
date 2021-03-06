const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;


/* GET home page */
router.get('/', (req, res, next) => {
    // res.render('index');
    res.render('auth/login')
});


/* GET Signup */

//exportando
module.exports = router;