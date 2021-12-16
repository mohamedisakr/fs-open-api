const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const {Schema, model} = mongoose

require('../utils/connection')

const userSchema = new Schema({
  email: {type: String, required: true, minlength: 3, unique: true},
  passwordHash: String,
  name: String,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}
// cause this error
// User validation failed: _id: Error, expected `_id` to be unique.
// Value: `615e7b82a6aaf67e7d9f9e8d`
// userSchema.plugin(uniqueValidator)
const User = model('User', userSchema)

module.exports = User
