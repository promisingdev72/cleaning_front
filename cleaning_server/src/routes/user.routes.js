const usercontroller = require("../controllers/user.controller");
const { verifySignUp } = require("../middlewares");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Employee

  app.post("/api/account/addemployee", usercontroller.addEmployee);
  app.get("/api/account/getemployee", usercontroller.getEmployees);
  app.post("/api/account/editemployee", usercontroller.editEmployee);
  app.post("/api/account/delemployee", usercontroller.delEmployee);

  // Customer

  app.post("/api/account/addcustomer", usercontroller.addCustomer);
  app.get("/api/account/getcustomer", usercontroller.getCustomers);
  app.post("/api/account/editcustomer", usercontroller.editCustomer);
  app.post("/api/account/delcustomer", usercontroller.delCustomer);

  // Profile

  app.get("/api/account/getprofile", usercontroller.getProfile);
  // app.post('/api/account/updateProfile', usercontroller.updateProfile);
};
