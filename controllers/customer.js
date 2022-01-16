const customersRouter = require('express').Router()
const pagination = require('../middleware/pagination')
const Customer = require('../models/customer')

customersRouter.get('/', pagination(Customer), (req, res, next) => {
  try {
    res.json(res.results)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = customersRouter
