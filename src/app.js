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
    res.status(400).send("Error saving the user data!" + error.message);
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
