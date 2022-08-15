const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db')

const app = express();

app.use(cors());
app.use(bodyParser.json())
  
app.get('/showMember', (req, res) => {
    const SHOW_MEMBER = "SELECT * FROM MEMBERS";
    console.log(SHOW_MEMBER, 'show member')
    connection.query(SHOW_MEMBER, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('show the members')
        }
    })
})

app.post('/addMember', (req, res) => {
    const ADD_MEMBER = "INSERT INTO members (memberID, name, weight, height, age, gender) VALUES ('${req.body.memberID}', '${req.body.name}', '${req.body.weight}', '${req.body.height}', '${req.body.age}'";
    console.log(ADD_MEMBER, 'add member')
    connection.query(ADD_MEMBER, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('you added a new member')
        }
    })
})


app.get('/deleteMember', (req, res) => {
    res.send('member deleted')
})

app.listen(4000, () => {
    console.log('running on port 4000')
})