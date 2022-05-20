module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('companies', {
    userId: {
      type: Sequelize.INTEGER,
    },
    companyName: {
      type: Sequelize.STRING,
    },
  });
  return Company;
};
