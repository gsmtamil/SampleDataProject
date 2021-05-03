const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const express = require("express");
const path = require("path");

const app = express();
const MongoDb = require("./server/database/mongodb");
const cors = require("cors");
app.use(cors());

/**
 * Server HTML landing page
 */
app.use("/", require("./server/routes"));

const { getAPIRouter } = require("./server/apis-rest");

/** RESTFul APIs v
 */
app.use("/api/v1", getAPIRouter({ version: "v1" }));

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
