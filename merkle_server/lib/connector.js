//  mondodb connect
const mongoose = require("mongoose");

function mongoConnection() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}

module.exports = mongoConnection;