const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
// const {initialNotes} = require('../fixtures/notes-data')
// const {nonExistingId, notesInDb} = require('./note-helper')

const api = supertest(app)
const url = '/api/users'

describe('restrictions to creating new users', () => {
  beforeEach(async () => {
    await User.deleteMany({}).lean().exec()
  })

  test('both username and password must be given', async () => {
    const newUser = {username: 'root'}
    const result = await api.post(url).send(newUser).expect(400)
  })

  test('both username and password must be at least 3 characters long', async () => {
    const newUser = {username: 'ro', password: 'ot'}
    const result = await api.post(url).send(newUser).expect(400)
  })

  test('username must be unique', async () => {
    const newUser = {username: 'ro', password: 'ot'}
    const result = await api.post(url).send(newUser).expect(400)
  })
})

describe.skip('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    // const user = new User({username: 'root', passwordHash})
    // await user.save()
    await User.create({username: 'root', passwordHash})
  }, 20000)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {username: 'root', name: 'Superuser', password: 'salainen'}

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
