const buscontroller = require("../controllers/bus.controller");
const { verifySignUp } = require("../middlewares");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/account/addbus", buscontroller.addBus);
  app.get("/api/account/getbus", buscontroller.getBuses);
  app.post("/api/account/editbus", buscontroller.editBus);
  app.post("/api/account/delbus", buscontroller.delBus);
};
