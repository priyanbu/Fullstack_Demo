const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const query1 = 'select * from users';

// Set up connection to database.
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'webapp',
    port: 3306,
});

// Connect to database.
 connection.connect(err => {
     if(err) {
         return err;
     }
 });

 app.use(cors());

// Listen to POST requests to /users.
app.post('/todo', (req, res) => {
    console.log("...req : ",req);
    let charactor = req.body.charactor;
 

    connection.query("insert INTO users SET ? ", { name:charactor }, (error, results, fields) => {
        if (error)
            throw error;
       if(charactor !== ''){
         res.send( 'New record has been created successfully.');
       }else{
        res.send( 'Please give some input to store data');
       }

    });
});


app.get('/users', (req, res) => {
    connection.query(query1, (err, results) => {
        if(err){
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.post('/sample', (req, res) => {
    let name = req.body.name;
    res.send('arun');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

module.exports = app;