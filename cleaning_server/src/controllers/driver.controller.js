const db = require('../models');

const Driver = db.bus;

exports.addDriver = (req, res) => {
  const { userId } = req.body;
  const { driverName } = req.body;
  const { driverPhoneNumber } = req.body;
  Driver.create({
    userId,
    driver_name: driverName,
    driver_phone: driverPhoneNumber,
  })
    .then(() => {
      res.status(200).send({ message: 'Driver Added!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.getDrivers = (req, res) => {
  const { customerId } = req.body;

  console.log('customerId:', customerId);
  // Driver.findAll({ where: { userId } })
  //   .then((busInfos) => {
  //     const driverList = [];
  //     busInfos.map((busInfo) => {
  //       const { driver_name, driver_phone } = busInfo;
  //       const driver = {
  //         driver_name,
  //         driver_phone,
  //       };
  //       driverList.push(driver);
  //     });
  //     res.status(200).send({ driverList });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({ message: err });
  //   });
};

exports.editDriver = (req, res) => {
  const { driverName } = req.body;
  const { driverPhoneNumber } = req.body;
  Driver.update(
    {
      driver_name: driverName,
      driver_phone: driverPhoneNumber,
    },
    { where: { driver_name: driverName } }
  )
    .then(() => {
      res.status(200).send({ message: 'Update is success' });
    })
    .catch((err) => res.status(500).send({ message: err }));
};

exports.delDriver = (req, res) => {
  const { driverId } = req.body;
  Driver.destroy({
    where: {
      id: driverId,
    },
  })
    .then(() => {
      res.status(200).send({ message: 'Driver Deleted!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
