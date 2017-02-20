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

//DELETE borra una nota
exports.deleteNote =  function(req, res) {
    Note.remove({
        _id: req.params.id
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

////NOTAS FAVORITAS////

//GET - TODOS LAS NOTAS favoritas
exports.findAllNotesFavourites = function(req, res) {
    Favourite.find(function(err, favourite) {
        if (err){
          res.send(500, err.message);
        }
        else{
          res.status(200).jsonp(favourite);
        }
    });
};


// POST añade una nota favorita
exports.addNoteFavourite = function(req, res) {
    Favourite.create({
        user: req.body.user,
        favouritesNotes: req.body.favouritesNotes //req.body.favouritesNotes, //req.params.note

  }, function(err, favourite) {
      if(err){
          res.send(err);
      }
      res.json(favourite);
      // Favourite.find(function(err, favourite) {
      //     if(err){
      //         res.send(err);
      //     }
      //
      // });
  })
};
