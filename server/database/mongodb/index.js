const Mongoose = require("mongoose");

let dbURI =
  "mongodb+srv://sampleDataUser:ofIiBEtgt8cbFhu1@cluster0.ce0cs.mongodb.net/sampleDataSet?retryWrites=true&w=majority";

Mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
});
const db = Mongoose.connection;

db.on("error", function () {
  console.error.bind(console, "connection error:");
});

db.on("connecting", function () {
  console.log("DB connection in progress");
});

db.once("open", function () {
  console.log("DB Connected");
});

db.on("reconnected", function () {
  console.log("MongoDB connection reconnected!");
});

db.on("disconnected", function () {
  console.log("MongoDB connection disconnected!");
});

module.exports = {
  Mongoose,
  models: {
    employee: require("./schemas/employee.js"),
    learningHistory: require("./schemas/learningHistory.js"),
  },
  dbURI,
};
