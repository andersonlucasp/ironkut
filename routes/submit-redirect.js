const {
    Router
} = require('express');
const submit = new Router();
const mongoose = require('mongoose');
//user model
const User = require('../models/user.model');


module.exports = submit;