const userModel = require('../models/User');
const dbOperations = require('../database/dbOperations');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');


module.exports.login = (req, res) => {

};

module.exports.register = (req, res) => {
  const { username, password, passwordConfirmation, email } = req.body;

  if (!password || !email) {
    return res.status(422).send({ errors: [{ title: "Missing Data", detail: "Email or password are missing" }] })
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({ errors: [{ title: "Invalid Password", detail: "Password must match confirmation password" }] });
  }

  dbOperations.findBy(userModel.find, {email, conditions: [{key: "email"}]})
  .then((results) => {
    if(results.length > 0) {
      throw new Error("User with provided email already exists");
    }
    return bcrypt.genSalt(10);
  })
  .then((salt)=> {
    return bcrypt.hash(password, salt);
  }).then((hash) => {
    return dbOperations.insert(userModel.insert, {email, password: hash, user_name: username});
  })
  .then((id) => {
    jwt.sign({
      sub: id,
      username,
      email,
    },config.JWT_SECRET,
    (err, encoded) => {
      if(err) {
        throw new Error(err.message)
      }
      return res.status(200).send({token: encoded});
    })
  })
  .catch(err => {
    return res.status(422).send({ errors: [{ title: "DB Error", detail: err.message }] });
  })
};
