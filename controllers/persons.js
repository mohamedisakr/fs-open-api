const jwt = require('jsonwebtoken')
const personsRouter = require('express').Router()
const Person = require('../models/person')
// const Blog = require('../models/blog')
// const User = require('../models/user')

personsRouter.get('/api/info', (request, response) => {
  Person.estimatedDocumentCount((err, count) => {
    if (err) {
      response.status(404).end()
    } else {
      response
        .status(200)
        .json({message: `Phonebook has info for ${count} people`})
    }
  })
})

personsRouter.get('/', async (request, response) => {
  await Person.find({}).then((persons) => response.json(persons))
})

personsRouter.post('/', async (request, response, next) => {
  const {name, number} = request.body

  try {
    //#region
    /*     if (!name) {
    return response.status(400).json({
      error: 'name missing',
    })
  }

  if (!number) {
    return response.status(400).json({
      error: 'number missing',
    })
  }
*/
    /*
  // TODO: check for duplicate name
  const foundPerson = await Person.find({name}).lean().exec()

  console.log(foundPerson)

  if (foundPerson) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }
*/
    //#endregion

    const person = await Person.create({name, number})
    response.json(person.toJSON())
  } catch (error) {
    next(error)
  }
})

personsRouter.get('/:id', async (request, response, next) => {
  const {id} = request.params

  try {
    const person = await Person.findById(id).lean().exec()
    if (person) {
      response.json(person)
    } else {
      response
        .status(404)
        .json({message: 'The server has not found anything matching'})
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

personsRouter.put('/:id', async (request, response, next) => {
  const {id} = request.params
  const {name, number} = request.body

  const person = {name, number}

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, person, {
      new: true,
    })
    response.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

personsRouter.delete('/:id', async (request, response, next) => {
  try {
    const {id} = request.params
    const person = await Person.findByIdAndDelete(id.toString()).lean().exec()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = personsRouter
