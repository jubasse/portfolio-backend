'use strict';
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash the user's password before inserting a new user
UserSchema.pre('save', function(next) {
    var user = this;
    if (!this.isModified('password') || !this.isNew) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

// Compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        err
        ? cb(err)
        : cb(null, isMatch)
    });
};

module.exports = mongoose.model('User', UserSchema);