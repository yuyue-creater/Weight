const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json())

const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createConnection({
    host: "localhost",
    user: "michael",
    password: "hello",
    database: "weight"
});

module.exports = db;


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM members";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    console.log(req.body)

    const memberID = req.body.memberID;
    const name = req.body.name;
    const weight = req.body.weight;
    const height = req.body.height;
    const age = req.body.height;
    const gender = req.body.gender;

    const ADD_MEMBER = "INSERT INTO members (memberID, name, weight, height, age, gender) VALUES (?,?,?,?,?,?)"
    db.query(ADD_MEMBER, [memberID, name, weight, height, age, gender], (err, result) => {
        console.log(result);

    });
});

app.put("/api/update/:id", (req, res) => {

    const id = req.params.id;
    const weight = req.body.weight;
    const height = req.body.height;
    const name = req.body.name;
    const age = req.body.height;
    const gender = req.body.gender;

    console.log(`update ${id}`)
    console.log(req.body)




    db.query("UPDATE members SET weight = ?, height = ?, name = ?, age = ?, gender=? WHERE memberID = ?",
        [weight, height, name, age, gender, id],

        (err, result) => {
            console.log("here")
            if (err) {
                console.log(`error: ${err}`);
            } else {
                console.log(`result: ${JSON.stringify(result)}`)
                res.send(result);
            }
        }
    );
});

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(`delete ${id}`)

    db.query("DELETE FROM members WHERE memberID = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/api/getAll/", (req, res) => {
    db.query("SELECT * FROM members", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(8000, () => {
    console.log("running on port 8000");
})