var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

// Middlewares configuracion
app.use(bodyParser.urlencoded({extended: false}));
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

// Import models & controllers
var modelNote = require('./models/note')(app, mongoose);
var modelFavourite = require('./models/usersFavourites')(app, mongoose);
var NoteCtrl = require('./controllers/notes');

// // API routes
var notes = express.Router();

notes.route('/notes')
    .get(NoteCtrl.findAllNotes)
    .post(NoteCtrl.addNote)

notes.route('/notes/:id')
    .get(NoteCtrl.findById)
    .delete(NoteCtrl.deleteNote)

notes.route('/notes/favourites')
    .get(NoteCtrl.findAllNotesFavourites)
    .post(NoteCtrl.addNoteFavourite)


app.use('/api', notes);


// Carga una vista HTML simple donde irá nuestra Single App Page, Angular Manejará el Frontend
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

//Arrancamos server
app.listen(8000, function() {
    console.log("Node server running on http://localhost:8000");
});
