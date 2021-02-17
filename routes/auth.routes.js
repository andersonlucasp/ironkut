const User = require('../models/user.model');
const { Router } = require('express');
const mongoose = require('mongoose');

const authRouter = new Router();

authRouter.get('/signup', (req, res, next) => res.render('auth/signup'));