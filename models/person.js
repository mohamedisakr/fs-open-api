const mongoose = require('mongoose')
require('../mongo.js')

const {Schema, model} = mongoose

const personSchema = new Schema({
  name: String,
  number: String,
})

const Person = model('person', personSchema)
module.exports = Person
