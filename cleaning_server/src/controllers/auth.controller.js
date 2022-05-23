const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const config = require('../config/auth.config');

const User = db.user;

const { ROLES } = db;

const JWT_SECRET = config.secret;
const JWT_EXPIRES_IN = 86400;

exports.login = (req, res) => {
  const { userName, password } = req.body;

  User.findOne({
    where: {
      name: userName,
    },
  })
    // eslint-disable-next-line consistent-return
    .then((userInfo) => {
      if (!userInfo) {
        return res.status(400).send({ message: 'Not found user!!!' });
      }

      const passwordIsValid = bcrypt.compareSync(password, userInfo.password);

      if (!passwordIsValid) {
        return res.status(400).send({
          accessToken: null,
          message: 'Wrong Password!',
        });
      }

      const token = jwt.sign({ userId: userInfo.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      const user = {
        id: userInfo.id,
        name: userInfo.name,
        phoneNumber: userInfo.phone_number,
        roleId: ROLES[userInfo.roleId - 1].toUpperCase(),
      };
      const accessToken = token;

      res.status(200).send({ accessToken, user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
