const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require(MODEL_PATH + 'User');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.AUTH_SECRET
    };
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({
            id: jwt_payload.id
        }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};