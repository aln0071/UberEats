const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema({
  userid: { type: Schema.Types.ObjectId },
  favorites: [{ type: Schema.Types.ObjectId }],
});

const Favorite = mongoose.model('Favorites', favoriteSchema);

module.exports = {
  Favorite,
};
