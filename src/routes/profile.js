const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );
    await loggedInUser.save();
    res.status(200).json({
      data: loggedInUser,
      message: `Your profile updated succesfully ${loggedInUser.firstName}`,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/forget-password", userAuth, async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = req.user || User.findOne({ email });
    const comparePassword = await user.validatePassword(oldPassword);
    if (!comparePassword) {
      throw new Error("Incorrect Old Password!");
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.save();
    res.status(200).send({ message: "Password change successfull" });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
