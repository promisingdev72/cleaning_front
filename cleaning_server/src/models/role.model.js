module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    roleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    role: {
      type: Sequelize.STRING,
    },
  });
  return Role;
};
