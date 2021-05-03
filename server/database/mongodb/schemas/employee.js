const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    employee_id: {
      type: String,
    },
    delegate_id: String,
  },
  {
    timestamps: true,
  }
);

const employeeModel = Mongoose.model("employee", EmployeeSchema);

module.exports = employeeModel;
