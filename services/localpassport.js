const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/users');

const localStrategy = new LocalStrategy(async (username, password, done) => {
  const userMatch = await User.findOne({ username });
  if (!userMatch) {
    return done(null, false, { message: 'Incorrect username' });
  }
  if (!userMatch.checkPassword(password)) {
    return done(null, false, { message: 'Incorrect password' });
  }
  return done(null, userMatch);
});

module.exports = localStrategy;
