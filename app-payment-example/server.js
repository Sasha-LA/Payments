const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const qs = require('querystring');
const util = require('util');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const prefixes = [ '050', '066', '095', '099' ];
const packets = [ 25, 50, 75, 100 ];

app.get('/get_templates/html/:file', function(req, res){
	
	const file = req.params.file;
	console.log('get', __dirname + '/public/html/' + file);
    res.sendFile(__dirname + '/public/html/' + file, function (err) {
		if (err) 
			console.log(err);
		});	
});

app.get('/get_prefixes', function (req, res) {
  res.json({ prefixes : prefixes });
});

app.get('/get_packets', function (req, res) {
  res.json({ packets: packets });
});

app.post('/save_payment', function (req, res) {
  
		console.log('body', req.body);
        fs.appendFile('payments.txt', JSON.stringify(req.body) + '\n', 'utf8', function(err) {
			if (err)
				console.log(err);
		});
		res.send('Ok');
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
