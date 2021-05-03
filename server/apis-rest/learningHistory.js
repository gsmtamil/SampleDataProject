const express = require("express");
const learningHistoryRouter = express.Router();

const { restGETMany } = require("../logics");
// TODO all cred operations related to learningHistory

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

learningHistoryRouter.get("/", (req, res) => {
  restGETMany(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(apiErrorBuilder(err)));
});

module.exports = learningHistoryRouter;
