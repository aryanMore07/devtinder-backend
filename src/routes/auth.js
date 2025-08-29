const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Validate the data
    validateSignUpData(req.body);

    // Encryt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save the user data
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Succesfully!");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      res.status(401).send("Password wrong!");
    }
    const token = await user.getJWT();

    res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
    res.status(200).send({
      message: "User login successfull!",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = authRouter;
