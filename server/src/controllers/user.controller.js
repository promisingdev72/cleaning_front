/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const multer = require('multer');

const config = require('../config/auth.config');

const JWT_SECRET = config.secret;
const JWT_EXPIRES_IN = 86400;
const db = require('../models');

const User = db.user;
const { ROLES } = db;

exports.getEmployeeList = (req, res) => {
  const role = req.role;
  User.findAll({ where: { role: 2 } }).then((userInfos) => {
    const employees = [];
    userInfos.map((userInfo) => {
      const { id, name, email, role } = userInfo;
      const employee = {
        id,
        name,
        email,
        roles: ROLES[role - 1].toUpperCase(),
      };

      employees.push(employee);
    });
    res.status(200).send({ employees });
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
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.addNewEmployee = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let role = 2;
  User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 8),
    role: role,
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
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteEmployee = (req, res) => {
  let employeeId = req.body.employeeId;
  User.destroy({
    where: {
      id: employeeId,
    },
  });
  res.status(200).send('success');
};
