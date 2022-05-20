module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    busName: {
      type: Sequelize.STRING,
    },
    program: {
      type: Sequelize.STRING,
    },
    busDriverName: {
      type: Sequelize.STRING,
    },
    employeeId: {
      type: Sequelize.INTEGER,
    },
    arival: {
      type: Sequelize.STRING,
    },
    depart: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  });
  return Order;
};
