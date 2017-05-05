var express = require('express')
var app = express()
var paindata;
fs = require('fs');
fs.readFile('./paindata.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  paindata = data;
});

var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
 app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
  
 app.all('/paindata', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/paindata', function (req, res) {
	console.log(paindata);
  res.writeHead(200, {"Content-Type": "application/json"});

  res.end(paindata);
})

app.post('/setpaindata', function (req, res) {
	console.log(req.body);
	this.paindata = req.body;
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})