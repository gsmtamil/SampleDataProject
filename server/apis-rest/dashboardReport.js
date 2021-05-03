const express = require("express");
const dashboardRouter = express.Router();
const { dashboardReport } = require("../logics");

/**
 * @description this is for doing error object parsing
 * @param {*} err
 * takes an error object as input
 */
const apiErrorBuilder = function (err) {
  // parse our own error object based on module and error
  let _err = new Error("Data not found");
  _err.statusCode = "DA_4000"; //module based error code
};

dashboardRouter.get("/report", (req, res) => {
  dashboardReport(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(apiErrorBuilder(err)));
});

module.exports = dashboardRouter;
