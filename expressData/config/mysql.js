const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});
module.exports = connection;
