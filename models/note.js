exports = module.exports = function(app, mongoose) {

  // Definición de modelos  
  var note = new mongoose.Schema({
      text: { type: String }
    });

  mongoose.model('Note', note);
};
