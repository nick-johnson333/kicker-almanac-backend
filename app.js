const express = require('express');
const {Client} = require('pg');
const connectionString = "postgres://ijexgsielqcyxr:90a3789a8b5ceea5f70502e7905a17f4c8b61fe7b88d856d2823af2d6c80bebd@ec2-52-1-95-247.compute-1.amazonaws.com:5432/d89uja0jkmio1h";
const client = new Client({
	connectionString: connectionString,
	ssl: {rejectUnauthorized: false}
});
client.connect(err => {
	if(err) {
		console.log('connection error',err.stack);
	} else {
		console.log('connected');
	}
});
const app = express(); 

app.set('port',process.env.PORT || 4000);

app.get('/user_suggestions', (req, res, next) => {
	client.query('SELECT * FROM user_suggestions', [], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.get('/', (req, res, next) => {
	client.query('SELECT * FROM user_suggestions', [], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send({message: 'Hello, World'});
    });
});



app.listen(4000,  () => {
    console.log('Server is running.. on Port 4000');
});
