const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).lean().exec()
  response.json(notes)
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })

    const savedNote = await note.save()
    response.json(savedNote)
  } catch (error) {
    next(error)
  }

  /*
  // my implementation
  const {content, important} = request.body

  const note = await Note.create({
    content: content,
    important: important || false,
    date: new Date(),
  })

  response.json(note)
*/

  // note
  //   .save()
  //   .then((savedNote) => {
  //     response.json(savedNote)
  //   })
  //   .catch((error) => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, {new: true})
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

module.exports = notesRouter
