const {customers100} = require('../fixtures/persons-data')
const Customer = require('../models/customer')

require('./connection')
const createOne = async (model, objects) => {
  try {
    const doc = await model.create({...objects})
    return doc
  } catch (e) {
    console.error(e)
  }
}

const deleteMany = async (model) => {
  try {
    const docs = await model.deleteMany({}).exec()
    return docs
  } catch (e) {
    console.error(e)
  }
}

const createMany = async (model, data) => {
  try {
    const docs = await model.create(data) //.exec()
    return docs
  } catch (e) {
    console.error(e)
  }
}

// createMany(Customer, customers100)

module.exports = {createOne, deleteMany, createMany}
