const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
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
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note

/*
const mongoose = require('mongoose')
require('../mongo.js')

const {Schema, model} = mongoose

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = model('note', noteSchema)
module.exports = Note
*/
