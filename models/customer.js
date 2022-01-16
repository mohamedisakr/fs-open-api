/*
username: 'Richard.Hayes',
    name: 'Callie Nienow',
    email: 'Corbin_Harber86@hotmail.com',
*/

const {Schema, model} = require('mongoose')

require('../utils/connection')

const customerSchema = new Schema({
  username: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
})

const Customer = model('customer', customerSchema)
module.exports = Customer
