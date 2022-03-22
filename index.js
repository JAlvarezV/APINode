const express = require("express");
const { param } = require("express/lib/request");
const port = 80;
const app = express();

app.listen(process.env.PORT || port, () => {
 console.log("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.get('/', function (req, res) {  
    res.send("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.post('/', function (req, res) {
    res.send(JSON.stringify(req.headers) + JSON.stringify(param("test")) + JSON.stringify(req.body));
});
