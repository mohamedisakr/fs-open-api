const express = require('express')
const Note = require('./models/note.js')

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>API Home Page</h1>')
})

app.get('/api/notes', async (request, response) => {
  await Note.find({}).then((notes) => response.json(notes))
})

app.post('/api/notes', (request, response) => {
  const {content, important} = request.body

  if (!content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = Note.create({
    content: content,
    important: important ?? false,
    date: new Date(),
  })

  response.json(note)
})

app.get('/api/notes/:id', async (request, response) => {
  const id = request.params.id
  console.log(`id parameter : ${id}`)
  const note = await Note.findById(id).lean().exec()

  if (note) {
    response.json(note)
  } else {
    response
      .status(404)
      .json({message: 'The server has not found anything matching'})
  }
})

app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body

  const note = {
    content,
    important,
  }

  Note.findByIdAndUpdate(request.params.id, note, {new: true})
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

app.delete('/api/notes/:id', async (request, response) => {
  const {id} = request.params
  const note = await Note.findByIdAndDelete(id).exec()
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
