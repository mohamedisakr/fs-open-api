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

/*
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
*/

/*
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
*/
const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
