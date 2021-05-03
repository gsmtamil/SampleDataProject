const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const { recordsSchema } = require("./records");

const learningHistorySchema = new Schema(
  {
    found: Boolean,
    delegate_id: String,
    first_name: String,
    last_name: String,
    records: [recordsSchema],
  },
  {
    timestamps: true,
  }
);

const learningHistoryModel = Mongoose.model(
  "learningHistory",
  learningHistorySchema
);

module.exports = learningHistoryModel;
