const express = require("express");
const port = 80;
const app = express();

app.listen(process.env.PORT || port, () => {
 console.log("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.get('/', function (req, res) {  
    res.send("El servidor está inicializado en el puerto " + process.env.PORT);
});

app.post('/', function (req, res) {
    res.send("Headers: " + req.headers + "\n" + "Params: " + req.params + "\n" + "Body: " + req.body + "\n"); 
});
