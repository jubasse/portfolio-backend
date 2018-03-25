// BASE SETUP
// =============================================================================
global.ROOT_PATH = `${__dirname}/`;
require('dotenv').config();
require('./config/paths');

// call the packages we need
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const Promise = global.Promise = require('bluebird');
const port = process.env.PORT || 9093;
const passport = require('passport');

require('./models');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Init passport
app.use(passport.initialize());
require(CONFIG_PATH + 'passport')(passport);

// routes group
app.use('/api/v1', require(ROUTE_PATH));
const AuthController = require(CONTROLLER_PATH + 'AuthController');
app.post('/auth', AuthController.authenticate);

app.listen(port);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

exports.app = app;
exports.passport = passport;