const mongoose = require('mongoose')
const {Schema, model} = mongoose

require('../utils/connection')

const noteSchema = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Note = model('Note', noteSchema)
module.exports = Note
