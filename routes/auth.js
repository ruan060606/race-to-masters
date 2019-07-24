const router = require('express').Router();
const passport = require('passport');
const User = require('../db/models/users');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    // LogIn User
    // req / res held in closure
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      if (user) {
        return res.send({ redirect: '/' });
      }
    });
  })(req, res, next);
});

router.post('/signup', async (req, res, done) => {
  const { fullname } = req.body;
  const { email } = req.body;
  const { username } = req.body;
  const { password } = req.body;
  console.log(fullname);
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    // user doesn't exist
    const newUser = new User();
    newUser.fullname = fullname;
    newUser.email = email;
    newUser.username = username;
    newUser.password = newUser.hashPassword(password);
    newUser.platform = 'local';
    newUser.save();
    res.send({ redirect: '/Login' });
    return done(null, newUser);
  }
  res.json({
    message: `${existingUser.username} already exist`,
  });
  return done(null, existingUser);
});

router.get('/test', (req, res) => {
  res.send('Hello WOrld');
});

module.exports = router;
