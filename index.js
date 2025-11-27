const express = require("express");
const app = express();
const studentRoute = require("./src/route/studentRoute");
const cors = require("cors");

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use("/students", studentRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
