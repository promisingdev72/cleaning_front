const db = require("../models");
const Order = db.order;

exports.addOrder = (req, res) => {
  let busName = req.body.busName;
  let program = req.body.program;
  let busDriverName = req.body.busDriverName;
  let employeeId = req.body.employeeId;
  let arival = req.body.arival;
  let depart = req.body.depart;
  let status = req.body.status;
  Order.create({
    busName: busName,
    program: program,
    busDriverName: busDriverName,
    employeeId: employeeId,
    arival: arival,
    depart: depart,
    status: status,
  })
    .then(() => {
      res.status(200).send({ message: "Order Added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.getOrders = (req, res) => {
  let userId = req.body.userId;
  Order.findAll({ where: { userId: userId } })
    .then((orderInfos) => {
      const orderList = [];
      orderInfos.map((orderInfo) => {
        const {
          busName,
          program,
          busDriverName,
          employeeId,
          arival,
          depart,
          status,
        } = orderInfo;
        const order = {
          busName,
          program,
          busDriverName,
          employeeId,
          arival,
          depart,
          status,
        };
        orderList.push(order);
      });
      res.status(200).send({ orderList });
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
