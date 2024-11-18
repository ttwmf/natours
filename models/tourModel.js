const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  rating: {
    type: Number,
    require: [true, 'A tour must have a rating'],
  },
  price: {
    type: Number,
    require: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
