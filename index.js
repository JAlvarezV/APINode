const express = require("express");
const bodyParser = require('body-parser')
const { param } = require("express/lib/request");
const port = 80;
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

app.listen(process.env.PORT || port, () => {
 console.log("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.get('/', function (req, res) {  
    res.send("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.post('/', function (req, res) {
    res.send(JSON.stringify(req.headers) + JSON.stringify(req.query) + JSON.stringify(req.body));
    console.log(JSON.stringify(req.headers) + JSON.stringify(req.query) + JSON.stringify(req.body));
});
