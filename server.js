const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
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

app.post('/api/persons', async (request, response) => {
  const {name, number} = request.body

  if (!name) {
    return response.status(400).json({
      error: 'name missing',
    })
  }

  if (!number) {
    return response.status(400).json({
      error: 'number missing',
    })
  }

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

  const person = await Person.create({
    name,
    number,
  })

  response.json(person)
})

app.get('/api/persons/:id', async (request, response) => {
  const {id} = request.params
  console.log(`id parameter : ${id}`)

  const person = await Person.findById(id).lean().exec()
  if (person) {
    response.json(person)
  } else {
    response
      .status(404)
      .json({message: 'The server has not found anything matching'})
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  const {id} = request.params
  const {name, number} = request.body

  const person = {name, number}
  console.log(person)

  await Person.findByIdAndUpdate(id, person, {new: true})
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', async (request, response) => {
  const {id} = request.params
  const person = await Person.findByIdAndDelete(id).lean().exec()
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
