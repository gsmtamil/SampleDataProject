const express = require("express");

const restAPIRouter = express.Router();

// Import new API endpoints here
const employeeRESTRouter = require("./employee");
const learningHistoryRouter = require("./learningHistory");
const dashboardReportRouter = require("./dashboardReport");

const getAPIRouter = ({ version }) => {
  restAPIRouter.use("/employee", employeeRESTRouter);
  restAPIRouter.use("/learningHistory", learningHistoryRouter);
  restAPIRouter.use("/dashboard", dashboardReportRouter);

  return restAPIRouter;
};

module.exports = { getAPIRouter };
