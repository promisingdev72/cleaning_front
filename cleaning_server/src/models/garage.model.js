module.exports = (sequelize, Sequelize) => {
  const Garage = sequelize.define("garages", {
    userId: {
      type: Sequelize.INTEGER,
    },
    garage: {
      type: Sequelize.STRING,
    },
  });
  return Garage;
};
