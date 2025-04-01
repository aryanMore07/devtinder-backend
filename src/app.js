const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
require("./config/database");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Succesfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error saving the user data!" + error.message);
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

    if (data.skills.length > 10) {
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
