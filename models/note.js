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
