const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>API Home Page</h1>')
})

app.get('/api/info', (request, response) => {
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

app.get('/api/persons', async (request, response) => {
  await Person.find({}).then((persons) => response.json(persons))
})

app.post('/api/persons', async (request, response, next) => {
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

app.get('/api/persons/:id', async (request, response, next) => {
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

app.put('/api/persons/:id', async (request, response, next) => {
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

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const {id} = request.params
    const person = await Person.findByIdAndDelete(id.toString()).lean().exec()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
