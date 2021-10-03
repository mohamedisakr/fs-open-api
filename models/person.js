const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('../mongo.js')

const {Schema, model} = mongoose

const personSchema = new Schema({
  name: {type: String, unique: true, minlength: 3, required: true},
  number: {type: String, minlength: 3, required: true},
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  },
})

// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator)

const Person = model('person', personSchema)
module.exports = Person
