const db = require("../models");
const Bus = db.bus;

exports.addBus = (req, res) => {
  let userId = req.body.userId;
  let busNumber = req.body.busNumber;
  let busPlates = req.body.busPlates;
  let busGasCode = req.body.busGasCode;
  Bus.create({
    userId: userId,
    bus_number: busNumber,
    bus_plates: busPlates,
    bus_gas_code: busGasCode,
  })
    .then(() => {
      res.status(200).send({ message: "Bus Added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.getBuses = (req, res) => {
  let userId = req.body.userId;
  Bus.findAll({ where: { userId: userId } })
    .then((busInfos) => {
      const busList = [];
      busInfos.map((busInfo) => {
        const { bus_number, bus_plates, bus_gas_code } = busInfo;
        const bus = {
          bus_number,
          bus_plates,
          bus_gas_code,
        };
        busList.push(bus);
      });
      res.status(200).send({ busList });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.editBus = (req, res) => {
  let busNumber = req.body.busNumber;
  let busPlates = req.body.busPlates;
  let busGasCode = req.body.busGasCode;
  Bus.update(
    {
      bus_number: busNumber,
      bus_plates: busPlates,
      bus_gas_code: busGasCode,
    },
    { where: { bus_number: busNumber } }
  )
    .then(() => {
      res.status(200).send({ message: "Update is success" });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
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
      res.status(200).send({ message: "Bus Deleted!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
