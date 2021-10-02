import express from 'express'
const app = express()

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const findById = (id) => {
  const note = notes.find((n) => n.id === id)
  return note
}

app.get('/api/notes/:id', (request, response) => {
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

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
