const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;

const { ROLES } = db;

const JWT_SECRET = config.secret;
const JWT_EXPIRES_IN = 86400;

exports.login = (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  console.log("userName", userName);
  User.findOne({
    where: {
      name: userName,
    },
  })
    .then((userInfo) => {
      if (!userInfo) {
        return res.status(400).send({ message: "Not found user!!!" });
      }

      const passwordIsValid = bcrypt.compareSync(password, userInfo.password);

      if (!passwordIsValid) {
        return res.status(400).send({
          accessToken: null,
          message: "Wrong Password!",
        });
      }

      const token = jwt.sign({ userId: userInfo.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      const user = {
        id: userInfo.id,
        name: userInfo.name,
        phoneNumber: userInfo.phone_number,
        role: ROLES[userInfo.roleId - 1].toUpperCase(),
      };
      const accessToken = token;

      res.status(200).send({ accessToken, user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
