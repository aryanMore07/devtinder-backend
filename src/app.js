const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    // res.send("Route handler One");
    console.log("Handling the route user!!");
    // res.send("Response!!");
    next();
  },
  (req, res) => {
    // res.send("Route handler One");
    console.log("Handling the route user 2!!");
    res.send("2nd Response!!");
  }
);

app.listen(7777, (req, res) => {
  console.log(`Express server is running on http://localhost:7777/`);
});
