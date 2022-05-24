const db = require('../models');

const Order = db.order;

exports.addOrder = (req, res) => {
  const { customerId, program, busNumber, busPlates, busGasCode, driverName, driverPhoneNumber, startDate, endDate } =
    req.body;
  Order.create({
    userId: customerId,
    program,
    busNumber,
    busPlates,
    busGasCode,
    driverName,
    driverPhoneNumber,
    startDate,
    endDate,
  })
    .then(() => {
      res.status(200).send({ message: 'Order Added!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.getAllOrders = (req, res) => {
  Order.findAll()
    .then((orderInfos) => {
      const orders = [];
      // eslint-disable-next-line array-callback-return
      orderInfos.map((orderInfo) => {
        const {
          id,
          userId,
          busNumber,
          busPlates,
          busGasCode,
          program,
          driverName,
          driverPhoneNumber,
          startDate,
          endDate,
          AssignedEmployees,
          status,
        } = orderInfo;

        const order = {
          id,
          userId,
          busNumber,
          busPlates,
          busGasCode,
          program,
          driverName,
          driverPhoneNumber,
          startDate,
          endDate,
          AssignedEmployees,
          status,
        };

        orders.push(order);
      });
      res.status(200).send({ orders });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.editOrder = (req, res) => {
  const { busGasCode, busNumber, program, busPlates, driverName, driverPhoneNumber, startDate, endDate, orderId } =
    req.body;
  Order.update(
    {
      busNumber,
      program,
      busGasCode,
      busPlates,
      driverName,
      driverPhoneNumber,
      startDate,
      endDate,
    },
    { where: { id: orderId } }
  )
    .then(() => {
      res.status(200).send({ message: 'Update is success' });
    })
    .catch((err) => res.status(500).send({ message: err }));
};

exports.delOrder = (req, res) => {
  const { orderId } = req.body;
  Order.destroy({
    where: {
      id: orderId,
    },
  })
    .then(() => {
      res.status(200).send({ message: 'Order Deleted!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
