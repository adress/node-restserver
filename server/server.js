require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// ***** middlewars

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//show
app.get('/usuarios', function(req, res) {
    res.json('Hello World')
})

//store
app.post('/usuarios', function(req, res) {
    let body = req.body;
    res.json({
        "persona": body
    });
})

//update
app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
})

//delete
app.delete('/usuarios', function(req, res) {
    res.json('Hello World')
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});