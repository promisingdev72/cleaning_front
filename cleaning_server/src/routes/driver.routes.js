const drivercontroller = require('../controllers/driver.controller');
const { verifySignUp } = require('../middlewares');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.post('/api/account/adddriver', drivercontroller.addDriver);
  app.get('/api/account/getdriver', drivercontroller.getDrivers);
  app.post('/api/account/editdriver', drivercontroller.editDriver);
  app.post('/api/account/deldriver', drivercontroller.delDriver);
};
