const calc = require('./calc')
const numbersToAdd = [3, 4, 10, 10]
const result = Number(calc.sum(numbersToAdd))
console.log('result is:' + result)
console.log('Shark Yu is fat!')
console.log('hello form Node.js')


let mysql = require('mysql2');

let connection = mysql.createConnection({
  host: "localhost",
  user: "michael",
  password: "hello",
  database: "weight"
});

connection.connect(function (err) {
  if (err) {
    return console.log('error: ' + err.message);
  } else {
    console.log('conneted');
  }

});

connection.connect(function (err) {
  if (err) throw err;

  var sql = "UPDATE members SET name = 'Fat Overweight Shark' WHERE memberID = '2'";
  connection.query(sql, function (err, result) {

    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });

  connection.query("SELECT memberID FROM members", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});







var calculator = require('./calc'); 
    
var x = 50, y = 10; 
    
console.log("Addition of 50 and 10 is "
                   + calculator.add(x, y)); 
    
console.log("Subtraction of 50 and 10 is "
                   + calculator.sub(x, y)); 
    
console.log("Multiplication of 50 and 10 is "
                   + calculator.mult(x, y)); 
    
console.log("Division of 50 and 10 is " 
                   + calculator.div(x, y));

                   