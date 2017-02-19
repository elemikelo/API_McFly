var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

// Middlewares configuracion
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public')); //localizacion de los ficheros estaticos

//Conexion DB
mongoose.connect('mongodb://localhost/notes', function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});

// Definición de modelos
var Todo = mongoose.model('Note', {
    text: String
});


// Rutas de nuestro API

// GET de todas las notas
app.get('/api/notes', function(req, res) {
    Note.find(function(err, notes) {
        if(err) {
            res.send(err);
        }
        res.json(notes);
    });
});

// POST crea una nota y devuelve todas
app.post('/api/notes', function(req, res) {
    Note.create({
        text: req.body.text,
        done: false
    }, function(err, note){
        if(err) {
            res.send(err);
        }

        Note.find(function(err, notes) {
            if(err){
                res.send(err);
            }
            res.json(notes);
        });
    });
});

// DELETE borra una nota y devuelve todas tras borrarla
app.delete('/api/notes/:note', function(req, res) {
    Note.remove({
        _id: req.params.note
    }, function(err, note) {
        if(err){
            res.send(err);
        }

        Note.find(function(err, notes) {
            if(err){
                res.send(err);
            }
            res.json(notes);
        });

    })
});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

//Arrancamos server
app.listen(8000, function() {
    console.log("Node server running on http://localhost:8000");
});
