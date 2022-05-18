/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const multer = require('multer');

const config = require('../config/auth.config');

const JWT_SECRET = config.secret;
const JWT_EXPIRES_IN = 86400;
const db = require('../models');

const Bus = db.bus;

exports.addBus = (req, res) => {
  let companyName = req.body.companyName;
  let busNumbers = req.body.busNumbers;
  let busDriverName = req.body.busDriverName;
  let busDriverPhoneNumber = req.body.busDriverPhoneNumber;
  let busDepartingTime = req.body.busDepartingTime;
  let busArrivingTime = req.body.busArrivingTime;
  Bus.create({
    bus_company_name: companyName,
    bus_numbers: busNumbers,
    bus_driver_name: busDriverName,
    bus_driver_phone_number: busDriverPhoneNumber,
    bus_departing_time: busDepartingTime,
    bus_arriving_time: busArrivingTime,
  })
    .then(() => {
      res.status(200).send('Bus Added!!!');
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getBusList = (req, res) => {
  Bus.findAll()
    .then((busInfos) => {
      const busList = [];
      busInfos.map((busInfo) => {
        const {
          bus_company_name,
          bus_numbers,
          bus_driver_name,
          bus_driver_phone_number,
          bus_departing_time,
          bus_arriving_time,
        } = busInfo;
        const bus = {
          bus_company_name,
          bus_numbers,
          bus_driver_name,
          bus_driver_phone_number,
          bus_departing_time,
          bus_arriving_time,
        };
        busList.push(bus);
      });
      res.status(200).send({ busList });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.delBus = (req, res) => {
  let busId = req.body.busId;
  Bus.destroy({
    where: {
      id: busId,
    },
  })
    .then(() => {
      res.status(200).send('Bus Added!!!');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
exports.editBus = (req, res) => {
  let companyName = req.body.companyName;
  let busNumbers = req.body.busNumbers;
  let busDriverName = req.body.busDriverName;
  let busDriverPhoneNumber = req.body.busDriverPhoneNumber;
  let busDepartingTime = req.body.busDepartingTime;
  let busArrivingTime = req.body.busArrivingTime;
  Bus.update(
    {
      bus_company_name: companyName,
      bus_numbers: busNumbers,
      bus_driver_name: busDriverName,
      bus_driver_phone_number: busDriverPhoneNumber,
      bus_departing_time: busDepartingTime,
      bus_arriving_time: busArrivingTime,
    },
    { where: { bus_numbers: busNumbers } }
  )
    .then(() => {
      res.status(200).send('update is success');
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
