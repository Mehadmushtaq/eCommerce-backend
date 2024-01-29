const routes = require("express").Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../controllers/authToken");

const utilities = require("../utils");

//user registration route handler
routes.post("/register", async (req, res, next) => {
  // console.log(req.body, req.files);
  const user = await authController.registerUser(req, res);
  if (user?.status === 0) {
    return res.status(409).json(user);
  } else return res.json(user);
  next();
});

//user login route handler
routes.post("/login", async (req, res, next) => {
  const user = await authController.loginUser(req.body);
  if (user?.status === 0) {
    return res.status(409).json(user);
  } else {
    return res.status(200).json(user);
  }
  next();
});

//for authorizatoin
routes.get("/authorized", authMiddleware, (req, res) => {
  return res.json({ message: "Authorized access", userId: req.userId });
});

routes.post("/verify-token", (req, res) => {
  return res.json({ message: "Authorized access", user: req.user });
});

module.exports = routes;
