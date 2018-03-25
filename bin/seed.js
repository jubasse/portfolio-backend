require('dotenv').config();
global.CONFIG_PATH = __dirname + '/../config/';
require('./../database');

const User = require('./../models/User');

const user = new User({
    email: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASSWORD
});

user.save();

process.exit();