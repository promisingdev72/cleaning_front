module.exports = (sequelize, Sequelize) => {
  const Bus = sequelize.define("buses", {
    userId: {
      type: Sequelize.INTEGER,
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
  });
  return Bus;
};
