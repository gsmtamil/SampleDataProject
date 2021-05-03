const employeeModel = require("../database/mongodb").models.employee;
const learningHistoryModel = require("../database/mongodb").models
  .learningHistory;

const employeeDataSample = require("./data/sampledata.json");
const historyDataSample = require("./data/learninghistory.json");

function LoadEmployeeData() {
  employeeDataSample.root.employee.forEach((data) => {
    employeeModel.create(data);
    console.log(data, "created");
  });
}

// LoadEmployeeData();
function LoadHistoryData() {
  console.log(historyDataSample.root.records.length);
  historyDataSample.root.records.forEach((data) => {
    if (data.records == "") {
      data.records = [];
    }

    learningHistoryModel.create(data);
    console.log(data, "created");
  });
}

// LoadHistoryData();
