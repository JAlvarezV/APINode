const express = require("express");
const bodyParser = require('body-parser')
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
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
    console.log("Message:")
    var msgTemp = jsonParser(req.body,"message");
    console.log(msgTemp);
    var docTemp = jsonParser(msgTemp,"document");
    console.log("Document:")
    console.log(docTemp);    
    var docId = jsonParser(docTemp,"file_id");
    console.log("Document ID: " + docId);

    if ( typeof docId !== 'undefined' && docId )
    {        
        https.get("https://api.telegram.org/bot" + process.env.telegramToken + "/getFile?file_id="+docId, function(response) {            
            console.log("Downloading image...");
            console.log(JSON.stringify(response.body));
        });
        res.send("OK");
    }else{
        console.log("DocID Not Found");
        res.send("KO");
    }
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