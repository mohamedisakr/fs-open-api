const mongoose = require('mongoose')
require('../mongo.js')

const {Schema, model} = mongoose

const personSchema = new Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = model('person', personSchema)
module.exports = Person
