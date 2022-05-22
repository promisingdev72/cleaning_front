module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('orders', {
    userId: {
      type: Sequelize.STRING,
    },
    busNumber: {
      type: Sequelize.STRING,
    },
    busPlates: {
      type: Sequelize.STRING,
    },
    busGasCode: {
      type: Sequelize.STRING,
    },
    program: {
      type: Sequelize.STRING,
    },
    driverName: {
      type: Sequelize.STRING,
    },
    driverPhoneNumber: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.INTEGER,
    },
    endDate: {
      type: Sequelize.STRING,
    },
    AssignedEmployees: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  });
  return Order;
};
