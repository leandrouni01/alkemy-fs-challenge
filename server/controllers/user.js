const userModel = require('../models/User');
const dbOperations = require('../database/dbOperations');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports.login = (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(422).send({ errors: [{ title: "Missing Data", detail: "Email or password are missing" }] })
  }

  let username;
  let id;

  dbOperations.findBy(userModel.find, {email, conditions: [{key: "email"}]})
  .then((results) => {
    if(results.length < 1) {
      throw new Error("Invalid email or password");
    }
    username = results[0].user_name;
    id = results[0].id;
    return bcrypt.compare(password, results[0].password);
  })
  .then((isCorrectPassword) => {
    if(!isCorrectPassword) {
      throw new Error("Invalid email or password");
    }

    jwt.sign({
      sub: id,
      username,
      email
    },config.JWT_SECRET,
    (err, encoded) => {
      if(err) {
        throw new Error(err.message)
      }
      return res.status(200).send({token: encoded});
    })
  }).catch((err)=> {
    return res.status(422).send({ errors: [{ title: "DB Error", detail: err.message }] });
  })
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


module.exports.verifyUser = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token.split(" ")[1], config.JWT_SECRET, (err, decoded) => {
      if(err) {
        return unauthorizedError(res);
      }

      dbOperations.findOne(userModel.find, {id: decoded.sub})
      .then(result => {
        if(result.length > 0) {
          res.locals.user = result[0];
          next();
        } else {
          return unauthorizedError(res);
        }
      })
      .catch((err)=>{
        return res.status(422).send({errors: [{title: "Db Error", detail: err.message}]});
      })
    });
  } else {
    return unauthorizedError(res);
  }
}

function unauthorizedError(res) {
  return res.status(402).send({errors: [{title: "Unauthorized", detail: "You need to be loged in to access this section"}]});
}