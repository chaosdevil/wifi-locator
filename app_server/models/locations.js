const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema({
  days: {
    type: String,
    required: true
  },
  opening: String,
  closing: String,
  closed: {
    type: Boolean,
    required: true
  }
});

const reviewSchema = new mongoose.Schema({
  author: String,
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  reviewText: String,
  createdOn: {
    type: Date,
    'default': Date.now
  }
});

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  // add number boundaries to make sure 
  // it won't make any mistake 
  rating: {
    type: Number,
    'default': 0,
    min: 0,
    max: 5
  },
  facilities: [String],
  coords: {
    type: {type: String},
    coordinates: [Number]
  },
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema]
});

// 2dsphere enables MongoDB to do the correct calculations
// when running queries and returning results
// this allows MongoDB to calculate geometries based on
// a spherical object
locationSchema.index({coords: '2dsphere'});
