const mongoose = require("mongoose");
const mongoDB =
  process.env.DB_URL ||
  "mongodb+srv://mongodb:sXvsjf0aCtuzKIGW@cluster0.p3orf.mongodb.net/complaint-redressal?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

module.exports = db;
