const mongoose = require("mongoose");

const connectDb = async () =>
  await mongoose.connect(
    "mongodb+srv://aryanmore498:aryanmore498@neog.dfliypo.mongodb.net/devTinder"
  );

module.exports = connectDb;
