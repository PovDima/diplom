const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/user');
const config = require('../utils/config')
module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.JWT_ENCRYPTION;

  passport.use(
    new Strategy(opts, async function (jwt_payload, done) {
      try {
        const user = await User.findById(jwt_payload.userId);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
