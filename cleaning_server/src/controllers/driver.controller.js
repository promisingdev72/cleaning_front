const db = require('../models');

const Driver = db.driver;

exports.addDriver = (req, res) => {
  const { customerId, driverName, driverPhoneNumber } = req.body;

  Driver.create({
    userId: customerId,
    driverName,
    driverPhoneNumber,
  })
    .then(() => {
      res.status(200).send({ message: 'Driver Added!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.getDrivers = (req, res) => {
  const { customerId } = req.query;

  Driver.findAll({ where: { userId: customerId } })
    .then((driverInfos) => {
      const drivers = [];
      // eslint-disable-next-line array-callback-return
      driverInfos.map((driverInfo) => {
        const { id, driverName, driverPhoneNumber } = driverInfo;
        const driver = {
          id,
          driverName,
          driverPhoneNumber,
        };
        drivers.push(driver);
      });
      res.status(200).send({ drivers });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.editDriver = (req, res) => {
  const { driverId, driverName, driverPhoneNumber } = req.body;
  Driver.update(
    {
      driverName,
      driverPhoneNumber,
    },
    { where: { id: driverId } }
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
