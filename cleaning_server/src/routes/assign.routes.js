// eslint-disable-next-line import/no-unresolved
const assigncontroller = require('../controllers/assign.controller');
const { verifySignUp } = require('../middlewares');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.post('/api/account/addassignemployees', assigncontroller.addAssignEmployees);
  app.get('/api/account/getassignemployees', assigncontroller.getAssignEmployees);
};
