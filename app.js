const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

// //create connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "concussionapp",
// });

// //connect
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Mysql connected");
// });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World2"));
require("./routes/user.routes.js")(app);
app.listen(3000, () => {
  console.log("My rest API running on port 3k");
});
