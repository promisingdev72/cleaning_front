const config = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.garage = require('./garage.model')(sequelize, Sequelize);
db.driver = require('./driver.model')(sequelize, Sequelize);
db.bus = require('./bus.model')(sequelize, Sequelize);
db.order = require('./order.model')(sequelize, Sequelize);

// user vs role

db.user.belongsToMany(db.role, {
  through: 'user_role',
  foreignKey: 'userId',
  otherKey: 'roleId',
});
db.role.belongsToMany(db.user, {
  through: 'user_role',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

// user vs garage

db.garage.belongsTo(db.user, {
  foreignKey: 'userId',
});

db.user.hasOne(db.garage, {
  foreignKey: 'userId',
});

// user vs driver

db.user.hasMany(db.driver, {
  foreignKey: 'userId',
});
db.driver.belongsTo(db.user);

// user vs bus

db.user.hasMany(db.bus, {
  foreignKey: 'userId',
});
db.bus.belongsTo(db.user);

db.ROLES = ['admin', 'employee', 'customer'];

module.exports = db;
