var express = require("express");
var app = express();
var path = require("path");
var mysql = require("mysql");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const mysql_config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "weightrecords"
};
app.set("port", PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Get path: / || And host is " + req.ip);
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/data", (req, res) => {
  console.log("Get path: /data || And host is " + req.ip);
  res.sendFile(path.join(__dirname, "data.html"));
});

app.post("/api/post", (req, res) => {
  console.log("Get api path: /api/post || And host is " + req.ip);
  const new_data = req.body;
  var connection = mysql.createConnection(mysql_config);
  connection.connect();
  const sql = "INSERT INTO records (weight, time) VALUES (" 
        + new_data.weight + ", \"" 
        + new_data.time + "\")";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(200).json({ status: "fail" });
      return;
    }
    console.log("Insert Success!");
    res.status(200).json({ status: "success" });
  });
  connection.end();
});

app.get("/api/data", (req, res) => {
  console.log("Get api path: /api/data || And host is " + req.ip);
  var connection = mysql.createConnection(mysql_config);
  connection.connect();
  const sql = "SELECT * FROM records";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("[SELECT ERROR] - " + err.message);
      res.status(200).json({ status: "fail" });
      return ;
    }
    var data = [];
    result.forEach((item) => {
      data.push({
        weight_id: item.weight_id,
        weight: item.weight,
        time: item.time
      });
    });
    console.log("Send Data Success!");
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
  connection.end();
});

app.listen(app.get("port"), () => {
  console.log("Express Listen in port: " + app.get("port"));
});