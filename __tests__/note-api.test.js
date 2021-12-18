const mongoose = require('mongoose')
const Note = require('../models/note')
const {initialNotes} = require('../fixtures/notes-data')
const {nonExistingId, notesInDb} = require('./note-helper')
const {config} = require('../utils/config')

const api = require('../utils/common') //supertest(app)
const url = config.NOTE_URL // '/api/notes'

describe.skip('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
    await Note.create(initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get(url)
    expect(response.body.length).toBe(initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get(url)
    const contents = response.body.map((r) => r.content)
    expect(contents).toContain('Browser can execute only Javascript')
  })

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await notesInDb()
      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`${url}/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
      expect(resultNote.body).toEqual(processedNoteToView)
    })

    test('fails with status code 404 if note does not exist', async () => {
      const validNonexistingId = await nonExistingId()
      console.log(validNonexistingId)
      await api.get(`${url}/${validNonexistingId}`).expect(404)
    })

    test('fails with status code 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api.get(`${url}/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post(url)
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await notesInDb()
      expect(notesAtEnd.length).toBe(initialNotes.length + 1)

      const contents = notesAtEnd.map((n) => n.content)
      expect(contents).toContain(newNote.content)
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {important: true}
      await api.post(url).send(newNote).expect(400)
      const notesAtEnd = await notesInDb()
      expect(notesAtEnd.length).toBe(initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await notesInDb()
      const noteToDelete = notesAtStart[0]

      await api.delete(`${url}/${noteToDelete.id}`).expect(204)

      const notesAtEnd = await notesInDb()

      expect(notesAtEnd.length).toBe(initialNotes.length - 1)

      const contents = notesAtEnd.map((r) => r.content)

      expect(contents).not.toContain(noteToDelete.content)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})

/*
beforeEach(async () => {
  await Note.deleteMany({})
  await Note.create(initialNotes)
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await notesInDb()
  expect(notesAtEnd).toHaveLength(initialNotes.length + 1)

  const contents = notesAtEnd.map((n) => n.content)
  expect(contents).toContain('async/await simplifies making async calls')
})

//====================================
// add expect to test content is required error
//====================================
test('note without content is not added', async () => {
  const newNote = {important: true}
  const res = await api.post('/api/notes').send(newNote).expect(400)
  console.log(`res : ${res}`)
  // expect(res).toThrow()

  // const notesAtEnd = await notesInDb()
  // expect(notesAtEnd).toHaveLength(initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

  expect(resultNote.body).toEqual(processedNoteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await notesInDb()
  const noteToDelete = notesAtStart[0]

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

  const notesAtEnd = await notesInDb()

  expect(notesAtEnd).toHaveLength(initialNotes.length - 1)

  const contents = notesAtEnd.map((r) => r.content)

  expect(contents).not.toContain(noteToDelete.content)
})

afterAll(() => {
  mongoose.connection.close()
})
*/
