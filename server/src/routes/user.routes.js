const usercontroller = require('../controllers/user.controller');
const { verifySignUp, verifyDuplicateEmail } = require('../middlewares');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.post('/api/account/addnewemployee', [verifySignUp.checkDuplicateEmails], usercontroller.addNewEmployee);
  app.get('/api/account/employees', usercontroller.getEmployeeList);
  app.get('/api/account/customers', usercontroller.getCustomerList);
  app.get('/api/account/profile', usercontroller.getProfile);
  app.post('/api/account/deleteemployee', usercontroller.deleteEmployee);
  // app.post('/api/account/updateProfile', usercontroller.updateProfile);
};
