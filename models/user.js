const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const {Schema, model} = mongoose

const userSchema = new Schema({
  username: {type: String, unique: true},
  name: String,
  passwordHash: String,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
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

// cause this error
// User validation failed: _id: Error, expected `_id` to be unique.
// Value: `615e7b82a6aaf67e7d9f9e8d`
// userSchema.plugin(uniqueValidator)
const User = model('User', userSchema)

module.exports = User
