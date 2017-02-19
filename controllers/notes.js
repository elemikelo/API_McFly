var mongoose = require('mongoose');
var Note = mongoose.model('Note');
var Favourite = mongoose.model('Favourite');

// Rutas de nuestro API

//GET - TODOS LAS NOTAS
exports.findAllNotes = function(req, res) {
    Note.find(function(err, notes) {
        if (err){
          res.send(500, err.message);
        }
        else{
          res.status(200).jsonp(notes);
        }
    });
};

//GET Para consultar una sola nota
exports.findById = function(req, res) {
    Note.findById(req.params.id, function(err, note) {
        if (err){
          return res.send(500, err.message);
        }
        else{
            res.status(200).jsonp(note);
        }
    });
};

//POST - Insertar nueva nota a la DB y carga todas
exports.addNote = function(req, res) {
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
};

exports.deleteNote =  function(req, res) {
    Note.remove({
        _id: req.params.note
    }, function(err, todo) {
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
};

//GET - TODOS LAS NOTAS favoritas
// exports.findAllNotesFavourites = function(req, res) {
//     Favourite.find(function(err, Favourite) {
//         if (err){
//           res.send(500, err.message);
//         }
//         else{
//           res.status(200).jsonp(Favourite);
//         }
//     });
// };


// POST añade una nota favorita
// app.post('/api/notes/favourites', function(req, res) {
//     Note.create({
//         text: req.body.text,
//         done: false
//     }, function(err, note){
//         if(err) {
//             res.send(err);
//         }
//     });
// });
