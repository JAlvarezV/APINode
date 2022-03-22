const express = require("express");
const bodyParser = require('body-parser')
const { param } = require("express/lib/request");
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

app.listen(process.env.PORT, () => {
 console.log("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.get('/', function (req, res) {  
    res.send("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.post('/', function (req, res) {
    logRequest(req);
});

function jsonParser(stringValue, key) {
    var string = JSON.stringify(stringValue);
    var objectValue = JSON.parse(string);
    return objectValue[key];
 }


 function logRequest(req){
    console.log("Headers:\n");
    console.log(JSON.stringify(req.headers));
    console.log("Params:\n");
    console.log(JSON.stringify(req.params));
    console.log("Query:\n");
    console.log(JSON.stringify(req.query));
    console.log("Body:\n");
    console.log(JSON.stringify(req.body));
 }



/*
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');

const file = fs.createWriteStream("file.jpg");
const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
  response.pipe(file);
});
*/