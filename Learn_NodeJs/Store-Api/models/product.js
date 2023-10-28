const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'marcos', 'caressa'],
      message: '{VALUE} is not supported',
    },
    // enum: ['ikea', 'liddy', 'marcos', 'caressa'],
  },
})

module.exports = mongoose.model('Product', productSchema)
