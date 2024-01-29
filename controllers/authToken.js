const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];   //save token placed at index 1
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
  return res.status(401).json({ error: "Unauthorized" });
  }
};
module.exports = authMiddleware;