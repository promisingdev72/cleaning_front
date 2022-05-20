const authcontroller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middlewares");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/account/login", authcontroller.login);
  // app.post(
  //   '/api/account/register',
  //   [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
  //   authcontroller.register
  // );
};
