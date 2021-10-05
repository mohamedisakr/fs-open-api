const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const {initialNotes} = require('../fixtures/notes-data')
const {nonExistingId, notesInDb} = require('./note-helper')

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.create(initialNotes[0], initialNotes[1])
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map((r) => r.content)
  expect(contents).toContain('Browser can execute only Javascript')
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

afterAll(() => {
  mongoose.connection.close()
})
