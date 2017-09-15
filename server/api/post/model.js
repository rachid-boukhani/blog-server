import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  }]

})

export default mongoose.model('post', schema)
