const express = require("express");
var session = require('express-session');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser')
const passport = require('passport');
const cors = require('cors')
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const { param } = require("express/lib/request");
require('./passport-setup');
const f = require('./dflowfunc');

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({ secret: process.env.clientSecret }));
app.use(passport.initialize());
app.use(passport.session());



app.listen(process.env.PORT, () => {
 console.log("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.get('/', function (req, res) {  
    res.send("El servidor está inicializado en el puerto " + process.env.PORT);
});


app.get('/q', function (req, res) {  
   f.executeQueries([
    "Hello"
    ]);
    res.send("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.get('/failed', function (req, res) {  
    res.send("Failed!!");
});

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))


// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ["https://www.googleapis.com/auth/dialogflow"] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.post('/', function (req, res) {
    logRequest(req);    
    console.log("Message:")
    var msgTemp = jsonParser(req.body,"message");
    console.log(msgTemp);
    var chatTemp =  jsonParser(msgTemp,"chat");
    var chatId =  jsonParser(chatTemp,"id");
    console.log("ChatID: " + chatId);
    var docTemp = jsonParser(msgTemp,"document");     
    var docId;
    if ( typeof docTemp !== 'undefined' && docTemp )
    {          
       console.log("Document:")
       console.log(docTemp);  
       docId = jsonParser(docTemp,"file_id");
       console.log("Document ID: " + docId);
    } 

    if ( typeof docId !== 'undefined' && docId )
    {       
        console.log("Downloading image...URL: " + "https://api.telegram.org/bot" + process.env.telegramToken + "/getFile?file_id="+docId);

        axios.get("https://api.telegram.org/bot" + process.env.telegramToken + "/getFile?file_id="+docId)        
        .then(response => {
            console.log(response);           
        })
        .catch(error => {
            console.log(error);
        });
       
        res.send("OK");
    }else{
        /*DialogFlow Call*/
        console.log("DialogFlow Call");
        f.executeQueries([msgTemp.text]);        
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
    /*console.log("Headers:");
    console.log(JSON.stringify(req.headers));
    console.log("Params:");
    console.log(JSON.stringify(req.params));
    console.log("Query:");
    console.log(JSON.stringify(req.query));*/
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