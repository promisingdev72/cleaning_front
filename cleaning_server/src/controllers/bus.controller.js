const db = require('../models');

const Bus = db.bus;

exports.addBus = (req, res) => {
  const { busGasCode, busNumber, busPlates, customerId } = req.body;
  Bus.create({
    userId: customerId,
    busNumber,
    busPlates,
    busGasCode,
  })
    .then(() => {
      res.status(200).send({ message: 'Bus Added!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.getBuses = (req, res) => {
  const { customerId } = req.query;
  Bus.findAll({ where: { userId: customerId } })
    .then((busInfos) => {
      const buses = [];
      // eslint-disable-next-line array-callback-return
      busInfos.map((busInfo) => {
        const { id, busNumber, busPlates, busGasCode } = busInfo;
        const bus = {
          id,
          busNumber,
          busPlates,
          busGasCode,
        };
        buses.push(bus);
      });
      res.status(200).send({ buses });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.editBus = (req, res) => {
  const { busNumber, busPlates, busGasCode, busId } = req.body;
  Bus.update(
    {
      busNumber,
      busPlates,
      busGasCode,
    },
    { where: { id: busId } }
  )
    .then(() => {
      res.status(200).send({ message: 'Update is success' });
    })
    .catch((err) => res.status(500).send({ message: err }));
};

exports.delBus = (req, res) => {
  const { busId } = req.body;
  Bus.destroy({
    where: {
      id: busId,
    },
  })
    .then(() => {
      res.status(200).send({ message: 'Bus Deleted!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
