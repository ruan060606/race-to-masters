const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./services');
require('./db');
require('./db/models/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on PORT : ${PORT} :)`);
});
