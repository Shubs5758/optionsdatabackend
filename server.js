const port = 5000;
const express = require("express");
const app = require("./app");
//app.use(dbmodel);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${port}.`);
});
