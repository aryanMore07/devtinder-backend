const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(505).send("something went wrong!");
  }
});

app.get("/getUserData", (req, res) => {
  // try {
  throw new Error("sadasdasf");
  res.send("User data sent!");
  // } catch (error) {
  //   res.status(500).send("Some Error: Contact support team!");
  // }
});

app.listen(7777, (req, res) => {
  console.log(`Express server is running on http://localhost:7777/`);
});
