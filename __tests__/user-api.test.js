const bcrypt = require('bcrypt')
const User = require('../models/user')
const {usersInDb, generateNewUserFaker} = require('./user-helper')
// const {initialNotes} = require('../fixtures/notes-data')
const api = require('../utils/common')
const config = require('../utils/config')

describe('restrictions to creating new users', () => {
  beforeEach(async () => {
    await User.deleteMany({}).lean().exec()
  })

  test('both username and password must be given', async () => {
    const newUser = {username: 'root'}
    const result = await api.post(config.USER_URL).send(newUser).expect(400)
  })

  test('both username and password must be at least 3 characters long', async () => {
    const newUser = {username: 'ro', password: 'ot'}
    const result = await api.post(config.USER_URL).send(newUser).expect(400)
  })

  test('username must be unique', async () => {
    const newUser = {username: 'ro', password: 'ot'}
    const result = await api.post(config.USER_URL).send(newUser).expect(400)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    // {username: 'root', name: 'Superuser', password: 'salainen'}
    // const passwordHash = await bcrypt.hash('sekret', 10)
    const passwordHash = await bcrypt.hash('salainen', 10)
    await User.create({username: 'root', name: 'Superuser', passwordHash})
  })

  test('creation succeeds with a fresh username', async () => {
    //#region
    // const usersAtStart = await usersInDb()
    // .expect('Content-Type', /application\/json/)

    // const usersAtEnd = await usersInDb()
    // expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    // const usernames = usersAtEnd.map((u) => u.username)
    // expect(usernames).toContain(newUser.username)
    //#endregion
    const newUser = generateNewUserFaker()
    console.log(newUser)

    await api.post(config.USER_URL).send(newUser).expect(200)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {username: 'root', name: 'Superuser', password: 'salainen'}

    const result = await api
      .post(config.USER_URL)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
