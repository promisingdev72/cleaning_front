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
  const { orderId, status, userId } = req.body;
  Assign.update(
    {
      status,
    },
    { where: { orderId, employeeId: userId } }
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
      const { orderId, status } = assignedEmployeeInfo;
      const assinedOrderData = await Order.findOne({ where: { id: orderId } });
      const assignedOrders = [];
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
      } = assinedOrderData;

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
        // status,
      } = orderInfo;

      const statusLevels = { pending: 0, 'in progress': 1, complete: 2, 'Not Yet': 3 };

      const assignEmployeeData = await Assign.findAll({ where: { orderId: id } });

      const employeeIds = [];
      const currentStatus = [];

      assignEmployeeData.map((assignEmployee) => {
        const { employeeId, status } = assignEmployee;
        employeeIds.push(employeeId);
        currentStatus.push(status);
        return status;
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

      console.log('AAAAAAAAAAAAAAAAAAA', currentStatus);
      let status = 'Not Yet';
      // eslint-disable-next-line no-restricted-syntax
      for (const cstatus of currentStatus) {
        if (statusLevels[cstatus] < statusLevels[status]) {
          status = cstatus;
        }
      }

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
