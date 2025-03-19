const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Aryan", lastName: "More" });
});

app.listen(7777, (req, res) => {
  console.log(`Express server is running on http://localhost:7777/`);
});
