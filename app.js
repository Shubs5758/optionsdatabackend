const express = require("express");
const axios = require("axios");
const fetchdatarouter = require("./routers/fetchdatarouter");
const cors = require("cors");
const app = express();

app.use(cors());
app.use("/api", fetchdatarouter);

module.exports = app;
