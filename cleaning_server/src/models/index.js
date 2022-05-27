const Sequelize = require('sequelize');
const config = require('../config/db.config');

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
db.garage = require('./garage.model')(sequelize, Sequelize);
db.driver = require('./driver.model')(sequelize, Sequelize);
db.bus = require('./bus.model')(sequelize, Sequelize);
db.order = require('./order.model')(sequelize, Sequelize);
db.company = require('./company.model')(sequelize, Sequelize);
db.assEmployee = require('./assEmployee.model')(sequelize, Sequelize);

// order vs assEmployee
db.order.hasMany(db.assEmployee, {
  foreignKey: 'orderId',
});
db.assEmployee.belongsTo(db.order);

// user vs garage

db.user.hasMany(db.garage, {
  foreignKey: 'userId',
});

db.garage.belongsTo(db.user);

// user vs company

db.user.hasMany(db.company, {
  foreignKey: 'userId',
});
db.company.belongsTo(db.user);

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
