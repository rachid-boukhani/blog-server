import mongoose from 'mongoose'

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('category', schema)
