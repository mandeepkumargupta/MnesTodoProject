require("dotenv").config(); //
const express = require("express");
const router = require("./router");
const connection = require("../expressData/config/mysql");
const app = express();

app.use(express.json());
app.use("/", router);
app.get("/", (req, res) => {
  res.send("welcome to TODO");
});
//const portNo = 4000;
const portNo = process.env.PORT;
app.listen(portNo, () => {
  console.log("listening to port no 4000");
});
