require('dotenv').config();
const mongoose = require('mongoose');
const db_config = require('./../config/database');

mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${db_config.user}:${db_config.password}@${db_config.host}/${db_config.database}?${db_config.options}`);

const User = require('./../models/User');

const user = new User({
    email: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASSWORD
});

user.save();