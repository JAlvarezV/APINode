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
    console.log("Documents:")
    var docsTemp = jsonParser(req.body,"message");
    console.log(docsTemp);
    console.log("\n");
    console.log(jsonParser(docsTemp,"document"));
    res.send("OK");

});

function jsonParser(stringValue, key) {
    var string = JSON.stringify(stringValue);
    var objectValue = JSON.parse(string);
    return objectValue[key];
 }


 function logRequest(req){
    console.log("Headers:");
    console.log(JSON.stringify(req.headers));
    console.log("Params:");
    console.log(JSON.stringify(req.params));
    console.log("Query:");
    console.log(JSON.stringify(req.query));
    console.log("Body:");
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