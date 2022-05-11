const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions.origin));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./models');

const Role = db.role;

// db.sequelize.sync({ force: true }).then(() => {
//   const User = db.user;
//   User.create({
//     name: 'tetianaberina',
//     email: 'tetianaberina@gmail.com',
//     role: 1,
//     password: bcrypt.hashSync('root', 8),
//   });
//   initial();
// });

// const initial = () => {
//   Role.create({
//     id: 1,
//     name: 'admin',
//   });

//   Role.create({
//     id: 2,
//     name: 'employee',
//   });

//   Role.create({
//     id: 3,
//     name: 'customer',
//   });
// };

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

module.exports = app;
