const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const config = require('../config/auth.config');
const JWT_SECRET = config.secret;
const JWT_EXPIRES_IN = 86400;
const User = db.user;
const Garage = db.garage;
const { ROLES } = db;

exports.getEmployees = (req, res) => {
  User.findAll({ where: { roleId: 2 } }).then(async (employeeInfos) => {
    const employees = await getEmployeeData(employeeInfos);
    res.status(200).send({ employees });
  });
};

async function getEmployeeData(employeeInfos) {
  const asyncRes = await Promise.all(
    employeeInfos.map(async (employeeInfo) => {
      const { id, name, phoneNumber, roleId } = employeeInfo;
      const garageData = await Garage.findOne({ where: { userId: id } });
      const { garage } = garageData;
      const employee = {
        id,
        name,
        phoneNumber,
        garage,
        roleId: ROLES[roleId - 1].toUpperCase(),
      };
      return employee;
    })
  );
  return asyncRes;
}

exports.getCustomers = (req, res) => {
  User.findAll({ where: { roleId: 3 } }).then((customerInfos) => {
    const customers = [];
    customerInfos.map((customerInfo) => {
      const { id, name, phoneNumber, roleId } = customerInfo;
      const customer = {
        id,
        name,
        phoneNumber,
        roleId: ROLES[roleId - 1].toUpperCase(),
      };
      customers.push(customer);
    });
    res.status(200).send({ customers });
  });
};

// exports.updateProfile = (req, res) => {
//   User.update(
//     {
//       name: req.body.name,
//       roles: 1,
//     },
//     { where: { email: req.body.email } }
//   )
//     .then(() => {
//       res.status(200).send("update is success");
//     })
//     .catch((error) => {
//       return res.status(500).send("update is unsuccessfull");
//     });
// };

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
    .then((userInfo) => {
      const user = {
        id: userInfo.id,
        name: userInfo.name,
        phoneNumber: userInfo.email,
        roleId: ROLES[userInfo.roleId - 1].toUpperCase(),
      };
      res.status(200).send({ user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.addEmployee = (req, res) => {
  const { name, phoneNumber, garage } = req.body;
  const password = 'password';
  const roleId = 2;

  User.create({
    name: name,
    phoneNumber: phoneNumber,
    password: bcrypt.hashSync(password, 8),
    roleId: roleId,
  })
    .then((employeeInfo) => {
      Garage.create({
        userId: employeeInfo.id,
        garage: garage,
      }).then((garageInfo) => {
        const employee = {
          id: employeeInfo.id,
          name: employeeInfo.name,
          phoneNumber: employeeInfo.phoneNumber,
          garage: garageInfo.garage,
          roleId: ROLES[employeeInfo.roleId - 1].toUpperCase(),
        };
        res.status(200).send({ employee });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.addCustomer = (req, res) => {
  let userId = req.body.userId;
  let company = req.body.company;
  let name = req.body.name;
  let phoneNumber = req.body.phoneNumber;
  let password = 'password';
  let roleId = 3;
  User.create({
    name: name,
    phoneNumber: phoneNumber,
    password: bcrypt.hashSync(password, 8),
    roleId: roleId,
  })
    .then((customerInfo) => {
      const customer = {
        id: customerInfo.id,
        name: customerInfo.name,
        phoneNumber: customerInfo.phoneNumber,
        roleId: ROLES[customerInfo.roleId - 1].toUpperCase(),
      };
      res.status(200).send({ customer });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.editEmployee = (req, res) => {
  const { id, name, phoneNumber, garage } = req.body;
  User.update(
    {
      name: name,
      phoneNumber: phoneNumber,
    },
    { where: { id: id } }
  )
    .then((response) => {
      if (response[0]) {
        Garage.update(
          {
            garage: garage,
          },
          { where: { userId: id } }
        );
        res.status(200).send({ message: 'update is success' });
      } else res.status(500).send({ message: 'update is failed' });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

exports.editCustomer = (req, res) => {
  let company = req.body.company;
  let name = req.body.name;
  let phoneNumber = req.body.phoneNumber;
  let customerId = req.body.customerId;
  User.update(
    {
      name: name,
      phoneNumber: phoneNumber,
    },
    { where: { id: customerId } }
  )
    .then(() => {
      res.status(200).send('update is success');
    })
    .catch((error) => {
      return res.status(500).send('update is unsuccessfull');
    });
};

exports.delEmployee = async (req, res) => {
  const { employeeId } = req.body;
  User.destroy({
    where: {
      id: employeeId,
    },
  }).then((response) => {
    if (response) res.status(200).send({ message: 'Delete is success!' });
    else res.status(500).send({ message: 'Delete is failed!' });
  });
};

exports.delCustomer = (req, res) => {
  let customerId = req.body.customerId;
  User.destroy({
    where: {
      id: customerId,
    },
  });
  res.status(200).send('success');
};
