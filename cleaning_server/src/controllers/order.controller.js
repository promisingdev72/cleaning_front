const db = require('../models');

const Order = db.order;
const User = db.user;
const Assign = db.assEmployee;

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

exports.getAllOrders = async (req, res) => {
  Order.findAll().then(async (orderInfos) => {
    const orders = await getOrderData(orderInfos);
    res.status(200).send({ orders });
  });
};

async function getOrderData(orderInfos) {
  const asyncRes = await Promise.all(
    orderInfos.map(async (orderInfo) => {
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
        status,
      } = orderInfo;

      const assignEmployeeData = await Assign.findAll({ where: { orderId: id } });

      // eslint-disable-next-line array-callback-return
      const employeeIds = [];
      // eslint-disable-next-line array-callback-return
      assignEmployeeData.map((assignEmployee) => {
        const { employeeId } = assignEmployee;
        employeeIds.push(employeeId);
      });

      const users = await User.findAll();

      const userNames = [];

      users.map((user) => {
        const { id, name } = user;
        employeeIds.map((userId) => {
          if (userId === id) userNames.push(name);
          return name;
        });
        return user;
      });

      console.log({ orderId: id, userNames });

      const order = {
        id,
        userId,
        busNumber,
        busPlates,
        busGasCode,
        program,
        driverName,
        userNames,
        driverPhoneNumber,
        startDate,
        endDate,
        status,
      };
      return order;
    })
  );
  return asyncRes;
}

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
