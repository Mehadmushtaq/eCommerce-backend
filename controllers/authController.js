const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;
const { jwtToken } = require("../utils");

const registerUser = async (req, res) => {
  const isUserExist = await User.findOne({ where: { email: req.body.email } });
  if (isUserExist) {
    return {
      status: 0,
      message: "User already exists",
    };
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10); //hashing synchronously 10 times

    // console.log("req.file", req.file);

    const userInfo = {
      // profile: req.file.path,
      ...req.body,
    };

    const user = await User.create(userInfo);
    const token = jwtToken({ id: user.id, email: user.email });
    return { ...user, token };
  }
};
const loginUser = async (body) => {
  const user = await User.findOne({ where: { email: body.email } });

  if (!user) {
    return {
      status: 0,
      message: "user does not exist",
    };
  } else {
    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      return {
        status: 0,
        message: "user does not exist",
      };
    }
    //if both email and password matched

    const token = jwtToken({ id: user.id, email: user.email });
    return { ...user, token };
  }
};

module.exports = {
  registerUser,
  loginUser,
};
