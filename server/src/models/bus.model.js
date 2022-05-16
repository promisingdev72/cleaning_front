module.exports = (sequelize, Sequelize) => {
  const Bus = sequelize.define('buses', {
    bus_company_name: {
      type: Sequelize.STRING,
    },
    bus_numbers: {
      type: Sequelize.STRING,
    },
    bus_driver_name: {
      type: Sequelize.STRING,
    },
    bus_driver_phone_number: {
      type: Sequelize.STRING,
    },
    bus_departing_time: {
      type: Sequelize.STRING,
    },
    bus_arriving_time: {
      type: Sequelize.STRING,
    },
  });
  return Bus;
};
