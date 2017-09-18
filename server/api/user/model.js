import mongoose from 'mongoose'
import {compare, hash} from 'bcrypt'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true

  },
  password: {
    type: String,
    required: true
  }
})

schema.methods = {
  authenticate: function (password) {
    return compare(password, this.password)
  },
  encrypt: function (text) {
    return hash(text, 10)
  },

  toJson: function () {
    const obj = this.toObject()
    delete obj.password
    return obj
  }
}

// We need to hash the password before saving the user
schema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.encrypt(this.password).then((encryptPassword) => {
      this.password = encryptPassword
      next()
    }, next)
  } else {
    next()
  }
})

export default mongoose.model('user', schema)
