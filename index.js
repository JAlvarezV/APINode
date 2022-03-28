const express = require("express");
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')
//const fs = require('fs');
const f = require('./dflowfunc');
const { send } = require("process");

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(process.env.PORT, () => {
 console.log("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.get('/', function (req, res) {  
    res.send("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.post('/', function (req, res) {
    logRequest(req);    
    //console.log("Message:")
    var msgTemp = jsonParser(req.body,"message");
    if ( typeof msgTemp !== 'undefined' && msgTemp ){
        //console.log(msgTemp);
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
                
                console.log("FILE PATH: " + response.data.result.file_path);
                console.log("https://api.telegram.org/file/bot" + process.env.telegramToken + "/" + response.data.result.file_path);

                axios.post(process.env.capApiDocs, {                                        
                    'chat_id': chatId,
                    'file_url': "https://api.telegram.org/file/bot" + process.env.telegramToken + "/" + response.data.result.file_path
                },{
                    headers: {
                        'Content-Type': 'application/json',
                        'Appian-API-Key': process.env.capApiToken
                    }
                }
                )      
                .then((response) => {
                   console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })   
            })
            .catch(error => {
               console.log(error);
            });
        
            res.send("OK");
        }else{
            /*DialogFlow Call*/
            console.log("DialogFlow Call");
            f.setIdSession(chatId);
            f.executeQueries([msgTemp.text]);        
            console.log("DocID Not Found");
            res.send("KO");
        }
    }
    else{
        res.send("No message input");
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
    console.log(JSON.stringify(req.query));
    console.log("Body:");
    console.log(JSON.stringify(req.body));*/
 }