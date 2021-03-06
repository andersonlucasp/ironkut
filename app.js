require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');


mongoose
    .connect('mongodb+srv://fernandaDelleprane:123@@cluster0.tknbx.mongodb.net/ironkut?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

require('./configs/session.configs')(app);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//Partials configuration
hbs.registerPartials(path.join(__dirname, "/views/partials"));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


const index = require('./routes/index');
app.use('/', index);

const signup = require('./routes/auth.routes');
app.use('/', signup)

const login = require('./routes/auth.routes');
app.use('/', login)

const editProfile = require('./routes/edit.profile');
app.use('/', editProfile);

const userProfile = require('./routes/auth.routes');
app.use('/', userProfile);

const profile = require('./routes/profile');
app.use('/', profile);

const homePage = require('./routes/home.page');
app.use('/', homePage);

const search = require('./routes/busca');
app.use('/', search);

const select = require('./routes/select-search-user');
app.use('/', select);

const submit = require('./routes/submit-redirect');
app.use('/', submit);

module.exports = app;