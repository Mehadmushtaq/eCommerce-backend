const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const fs = require("fs");

const deleteUser = async (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      console.log("Successfully deleted record.");
    })
    .catch((error) => {
      console.error("Failed to delete record : ", error);
    });
};

const findUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.error("Failed to Found user : ", error);
    });
};

const updateUser = async (req, res) => {
  // console.log("update method");
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  User.update(
    {
      profile: req?.file?.path,
      ...req.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((res) => {
      console.log("User updated succesfully");
    })
    .catch((error) => {
      console.error("Failed to update : ", error);
    });
};

const updateProfile = async (req, res) => {
  const path = await User.findOne({
    //save path of current image to remove later
    where: {
      id: req.params.id,
    },
    attributes: ["profile"],
  });
  //update user profile
  User.update(
    {
      profile: req.file.path,
      ...req.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      // console.log("profile updated succesfully");
      fs.unlink(path.profile, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    })
    .catch((error) => {
      console.error("Failed to update : ", error);
    });
};

const getAllUsers = async (req, res) => {
  const user = await User.findAll()
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.error("Failed to Found user : ", error);
    });
};

module.exports = {
  deleteUser,
  findUser,
  updateUser,
  getAllUsers,
  updateProfile,
};
