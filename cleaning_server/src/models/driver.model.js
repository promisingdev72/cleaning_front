module.exports = (sequelize, Sequelize) => {
  const Driver = sequelize.define("drivers", {
    userId: {
      type: Sequelize.INTEGER,
    },
    driverName: {
      type: Sequelize.STRING,
    },
    driverPhone: {
      type: Sequelize.STRING,
    },
  });
  return Driver;
};
