
exports = module.exports = function(app, mongoose) {

var favourite = new mongoose.Schema({
    user: { type: String },
    favouritesNotes: { type: String } //[ mongoose.Schema.Types.ObjectId ]
  });

  mongoose.model('Favourite', favourite);

};
