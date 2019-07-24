const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

mongoose.Promise = Promise;

const userSchema = new Schema({
  fullname: String,
  email: String,
  username: String,
  password: String,
  platform: String,
});

userSchema.methods = {
  checkPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};
const users = mongoose.model('Users', userSchema);
module.exports = users;
