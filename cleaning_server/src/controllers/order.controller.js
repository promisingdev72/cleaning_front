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

// exports.editOrder = (req, res) => {
//   let busName = req.body.busName;
//   let program = req.body.program;
//   let busDriverName = req.body.busDriverName;
//   let employeeId = req.body.employeeId;
//   let arival = req.body.arival;
//   let depart = req.body.depart;
//   let status = req.body.status;
//   Order.update(
//     {
//       busName: busName,
//       program: program,
//       busDriverName: busDriverName,
//       employeeId: employeeId,
//       arival: arival,
//       depart: depart,
//       status: status,
//     },
//     { where: { bus_number: busNumber } }
//   )
//     .then(() => {
//       res.status(200).send({ message: "Update is success" });
//     })
//     .catch((err) => {
//       return res.status(500).send({ message: err });
//     });
// };

// exports.delOrder = (req, res) => {
//   let busId = req.body.busId;
//   Order.destroy({
//     where: {
//       id: busId,
//     },
//   })
//     .then(() => {
//       res.status(200).send({ message: "Bus Deleted!" });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err });
//     });
// };
