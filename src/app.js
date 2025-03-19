const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello hello hello!");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.use("/", (req, res) => {
  res.send("Namaste from the dashboard!");
});

app.listen(7777, (req, res) => {
  console.log(`Express server is running on http://localhost:7777/`);
});
