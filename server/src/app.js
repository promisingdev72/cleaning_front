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

// const db = require('./models');

// const Role = db.role;

// db.sequelize.sync({ force: true }).then(() => {
//   const User = db.user;
//   const Bus = db.bus;
//   User.create({
//     name: 'admin',
//     email: 'admin@admin.com',
//     role: 1,
//     password: bcrypt.hashSync('admin', 8),
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
require('./routes/bus.routes')(app);

module.exports = app;
