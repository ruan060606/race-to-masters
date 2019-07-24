const passport = require('passport');
const googleStrategy = require('./googlepassport');
const localStrategy = require('./localpassport');
const User = require('../db/models/users');

passport.serializeUser((user, done) => {
  // store user.id
  done(null, user.id);
});
// callback the id we store
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(googleStrategy);

passport.use(localStrategy);

module.exports = passport;
