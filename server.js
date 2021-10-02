import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan('combined'))

app.use(express.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (request, response) => {
  response
    .status(200)
    .json({message: `Phonebook has info for ${persons.length} people`})
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
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

  const foundPerson = persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase(),
  )

  console.log(foundPerson)

  if (foundPerson) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const person = {
    id: generateId(),
    name,
    number,
  }

  persons = persons.concat(person)
  response.json(person)
})

const findById = (id) => {
  const person = persons.find((n) => n.id === id)
  return person
}

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(`id parameter : ${id}`)

  const person = findById(id)
  if (person) {
    response.json(person)
  } else {
    response
      .status(404)
      .json({message: 'The server has not found anything matching'})
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((note) => note.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
