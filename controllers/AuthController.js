'use strict';
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'), User = mongoose.model('User');

/**
 * Authenticates user
 * @param req
 * @param res
 */
exports.authenticate = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (! user || err) {
            return res.status(403).json({
                error: 'auth_failed',
                resource: 'user',
                errors: err.errors
            });
        }
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch || err) {
                return res.status(403).json({
                    error: 'auth_failed',
                    resource: 'user',
                    errors: err.errors
                });
            }
            // Create token if the password matched and no error was thrown
            const token = jwt.sign(user.toJSON(), process.env.AUTH_SECRET, {
                expiresIn: "2 days"
            });
            return res.json({
                status: 'auth_success',
                resource: 'user',
                data: { token }
            });
        });
    });
};