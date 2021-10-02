import express from 'express'
const app = express()

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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const {content, important} = request.body

  if (!content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = {
    content: content,
    important: important ?? false,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(note)
  response.json(note)
})

const findById = (id) => {
  const note = persons.find((n) => n.id === id)
  return note
}

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(`id parameter : ${id}`)

  const note = findById(id)
  if (note) {
    response.json(note)
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
