const express = require("express");
const connectDb = require("./config/database");
require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(authRouter);
app.use(profileRouter);
app.use(requestRouter);

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
