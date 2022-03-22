const express = require("express");
const port = 80;
const app = express();

app.listen(process.env.PORT || port, () => {
 console.log("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.get('/', function (req, res) {
    res.send('Saludos desde express');
});

app.post('/', function (req, res) {
    console.log("Headers: " + req.headers + "\n");
    console.log("Params: " + req.params + "\n");
    console.log("Body: " + req.body + "\n");    
});
