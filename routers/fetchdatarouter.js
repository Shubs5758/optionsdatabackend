const express = require("express");
const routes = express.Router();
const fetchoptionsdata = require("../controller/fetchdata");

routes.get("/option-data", fetchoptionsdata.fetchdata);

module.exports = routes;
