module.exports = (sequelize, Sequelize) => {
  const Driver = sequelize.define('drivers', {
    userId: {
      type: Sequelize.INTEGER,
    },
    driverName: {
      type: Sequelize.STRING,
    },
    driverPhoneNumber: {
      type: Sequelize.STRING,
    },
  });
  return Driver;
};
