const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
require("./config/database");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send("Password wrong!");
    }

    res.status(200).send({
      message: "User login successfull!",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Error fetching the users data!" + error.message);
  }
});

app.get("/users", async (req, res) => {
  const email = req.body.emailId;
  try {
    const user = await User.findOne();
    if (!user) {
      res.status(404).send(`No user found by email: ${email}`);
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

app.delete("/user", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send(`No user found by email: ${email}`);
    }
    res.status(200).send("User deleted successfully!");
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  const ALLOWED_UPDATES = [
    "userId",
    "photoUrl",
    "about",
    "gender",
    "age",
    "skills",
    "password",
  ];

  try {
    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed!");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("UPDATE FAILED: " + error.message);
  }
});

connectDb()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, (req, res) => {
      console.log(`Express server is running on http://localhost:7777/`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed!");
  });
