const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Aryan", lastName: "More" });
});

app.post("/user", (req, res) => {
  // Saving data to DB
  res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res) => {
  res.send("Deletion successfully!");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(7777, (req, res) => {
  console.log(`Express server is running on http://localhost:7777/`);
});
