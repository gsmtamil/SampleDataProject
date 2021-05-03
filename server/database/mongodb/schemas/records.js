const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const recordsSchema = new Schema({
  course_title: {
    type: String,
    trim: true,
  },
  course_code: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  training_provider: {
    type: String,
    trim: true,
  },
  completed_on: {
    type: Date,
  },
  valid_from: {
    type: Date,
  },
  valid_until: {
    type: Date,
  },
  previous_course_valid_until: {
    type: Date,
  },
  status: {
    type: String,
    trim: true,
  },
});

module.exports = {
  recordsSchema,
};
