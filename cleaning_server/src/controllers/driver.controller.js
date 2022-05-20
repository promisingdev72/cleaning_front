const db = require("../models");
const Driver = db.bus;

exports.addDriver = (req, res) => {
  let userId = req.body.userId;
  let driverName = req.body.driverName;
  let driverPhoneNumber = req.body.driverPhoneNumber;
  Driver.create({
    userId: userId,
    driver_name: driverName,
    driver_phone: driverPhoneNumber,
  })
    .then(() => {
      res.status(200).send({ message: "Driver Added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.getDrivers = (req, res) => {
  let userId = req.body.userId;
  Driver.findAll({ where: { userId: userId } })
    .then((busInfos) => {
      const driverList = [];
      busInfos.map((busInfo) => {
        const { driver_name, driver_phone } = busInfo;
        const driver = {
          driver_name,
          driver_phone,
        };
        driverList.push(driver);
      });
      res.status(200).send({ driverList });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.editDriver = (req, res) => {
  let driverName = req.body.driverName;
  let driverPhoneNumber = req.body.driverPhoneNumber;
  Driver.update(
    {
      driver_name: driverName,
      driver_phone: driverPhoneNumber,
    },
    { where: { driver_name: driverName } }
  )
    .then(() => {
      res.status(200).send({ message: "Update is success" });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

exports.delDriver = (req, res) => {
  let driverId = req.body.driverId;
  Driver.destroy({
    where: {
      id: driverId,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Driver Deleted!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
