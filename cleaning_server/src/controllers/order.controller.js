const db = require('../models');

const Order = db.order;
const User = db.user;
const Assign = db.assEmployee;

exports.addOrder = (req, res) => {
  const { customerId, program, busNumber, busPlates, busGasCode, driverName, driverPhoneNumber, startDate, endDate } =
    req.body;
  const status = 'pending';
  Order.create({
    userId: customerId,
    program,
    busNumber,
    busPlates,
    busGasCode,
    driverName,
    status,
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

exports.addStatus = (req, res) => {
  const { orderId, status } = req.body;
  console.log(orderId, status);
  Order.update(
    {
      status,
    },
    { where: { id: orderId } }
  )
    .then(() => {
      res.status(200).send({ message: 'Status Updated!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.getAssingedOrders = async (req, res) => {
  const { employeeId } = req.query;
  Assign.findAll({ where: { employeeId } }).then(async (assignedEmployeeInfos) => {
    const assignedOrders = await getAssignedOrderData(assignedEmployeeInfos);
    res.status(200).send({ assignedOrders });
  });
};

async function getAssignedOrderData(assignedEmployeeInfos) {
  const asyncRes = await Promise.all(
    assignedEmployeeInfos.map(async (assignedEmployeeInfo) => {
      const { orderId } = assignedEmployeeInfo;
      const assinedOrderData = await Order.findAll({ where: { id: orderId } });
      const assignedOrders = [];
      assinedOrderData.map(async (assinedOrder) => {
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
        } = assinedOrder;

        const assignedOrder = {
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
        };
        assignedOrders.push(assignedOrder);
      });
      return assignedOrders;
    })
  );
  return asyncRes.flatMap((asyncResEle) => asyncResEle);
}

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
          return userNames;
        });
        return user;
      });

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
