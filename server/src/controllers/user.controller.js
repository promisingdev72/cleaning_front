/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const jwt = require('jsonwebtoken');
// const multer = require('multer');

const config = require('../config/auth.config');

const JWT_SECRET = config.secret;

const db = require('../models');

const User = db.user;
const { ROLES } = db;

exports.getUserList = (req, res) => {
  User.findAll().then((userInfos) => {
    const users = [];
    userInfos.map((userInfo) => {
      const { id, name, email, roleId } = userInfo;
      const user = {
        id,
        name,
        email,
        roles: ROLES[roleId - 1].toUpperCase(),
      };

      users.push(user);
    });
    res.status(200).send({ users });
  });
};

exports.updateProfile = (req, res) => {
  User.update(
    {
      name: req.body.name,
      roles: 1,
    },
    { where: { email: req.body.email } }
  )
    .then(() => {
      res.status(200).send('update is success');
    })
    .catch((error) => {
      return res.status(500).send('update is unsuccessfull');
    });
};

exports.getProfile = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).send('Not authorization!');
  }

  const accessToken = authorization.split(' ')[1];
  const { userId } = jwt.verify(accessToken, JWT_SECRET);

  User.findOne({
    where: {
      id: userId,
    },
  })
    .then((userData) => {
      const user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: ROLES[userData.role - 1].toUpperCase(),
      };
      res.status(200).send({ user });
    })
    .catch((error) => {
      return res.status(200).send({ message: 'token is not' });
      //   console.log('token is undefined');
    });
};
