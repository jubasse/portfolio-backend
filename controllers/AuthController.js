'use strict';
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'),
    User = mongoose.model('User');
exports.authenticate = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (! user || err) {
            return res.status(403).json({
                status: 'auth_failed',
                errors: err.errors
            });
        }
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
                // Create token if the password matched and no error was thrown
                const token = jwt.sign(user.toJSON(), process.env.AUTH_SECRET, {
                    expiresIn: "2 days"
                });
                return res.json({
                    status: 'auth_success',
                    token
                });
            } else {
                res.status(403).json({
                    status: 'password_failed'
                });
            }
        });
    });
};