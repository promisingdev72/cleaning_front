const usercontroller = require('../controllers/user.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.post('/api/account/addnewemployee', usercontroller.addNewEmployee);
  app.get('/api/account/users', usercontroller.getUserList);
  app.get('/api/account/profile', usercontroller.getProfile);
  app.post('/api/account/updateProfile', usercontroller.updateProfile);
};
