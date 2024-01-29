const valideRole = (permissions) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    console.log(req.body);
    if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("not permitted");
    }
  };
};

module.exports = { valideRole };
