module.exports = (sequelize, Sequelize) => {
  const assEmployee = sequelize.define('assEmployees', {
    orderId: {
      type: Sequelize.INTEGER,
    },
    employeeId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
  });
  return assEmployee;
};
