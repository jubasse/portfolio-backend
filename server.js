// BASE SETUP
// =============================================================================
global.ROOT_PATH = `${__dirname}/`;
require('dotenv').config();
require('./config/paths');

// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const Promise = global.Promise = require('bluebird');
const port = process.env.PORT || 9093;        // set our port

require('./models');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================

app.use('/api/v1', require(ROUTE_PATH));

console.log(app.stack);

app.listen(port);