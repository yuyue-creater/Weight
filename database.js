const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
  host: "localhost",
  user: "michael",
  password: "hello",
  database: "weight"
});

db.connect(err => {
  if (err) {
    throw err 
  }
  console.log("MySQL Connected")
})

const app = express();
app.use(bodyParser.json());

app.get("/getMembers", (req, res) => {
  let sql = "SELECT * FROM members"
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err
    }
    console.log(results)
  })
})

// Create Database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database Created")
  });
});

app.get("/me", (req, res) => {
  res.send("I'm not fat! I hate being called fat!")
})

app.get("/shark", (req, res) => {
  res.send("Shark is fat! About 100 pounds overweight!")
})

app.listen('3000', () => {
  console.log('Server Started on port 3000')
})

app.set('title', 'HELLO WORLD');
  
app.get('/', (req, res) => {
  res.send(app.get('title'));
})
  
app.get("/getMembers1", (req, res) => {
  let sql = "SELECT * FROM members WHERE memberID=1"
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err
    }
    console.log(results)
  })
})