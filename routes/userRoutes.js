const routes = require("express").Router();
const userController = require("../controllers/userController");
const { valideRole } = require("../controllers/rolesMiddleware");
const utilities = require("../utils");

//find Specific user route handler
routes.get("/profile/:id", async (req, res, next) => {
  await userController.findUser(req, res);
  next();
});

//update Specific user route handler
routes.put("/profile/:id", utilities.upload, async (req, res, next) => {
  console.log("update route");
  await userController.updateUser(req, res);
  next();
});

routes.put(
  ":/id/deactivate",
  valideRole(["user, admin"]),
  async (req, res, next) => {
    await userController.updateUser(req, res);
    next();
  }
);

routes.put("/change-password/:id", async (req, res, next) => {
  await userController.updateUser(req, res);
  next();
});

routes.put(
  "/upload-profile-picture/:id",
  utilities.upload,
  async (req, res, next) => {
    await userController.updateProfile(req, res);
    next();
  }
);

//admin only
routes.get("/list", valideRole(["admin"]), async (req, res, next) => {
  await userController.getAllUsers(req, res);
  next();
});

routes.post("/findUser/:id", valideRole(["admin"]), async (req, res, next) => {
  await userController.findUser(req, res);
  next();
});

//user deletion route handler
routes.delete(
  "/delete/:id",
  valideRole(["admin", "user"]),
  async (req, res, next) => {
    await userController.deleteUser(req, res);
    next();
  }
);

//for user to get his/her account
routes.post("/findUser/:id", async (req, res, next) => {
  await userController.findUser(req, res);
  next();
});

routes.post("/logout", async (req, res, next) => {
  console.log("Logout-router");
  next();
});

module.exports = routes;
