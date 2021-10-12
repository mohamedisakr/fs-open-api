/*
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {getUsersInDb, generateNewUserFaker} = require('./user-helper')
// const {initialNotes} = require('../fixtures/notes-data')
const api = require('../utils/common')
const config = require('../utils/config')

describe.skip('restrictions to creating new users', () => {
  beforeEach(async () => {
    await User.deleteMany({}).lean().exec()
  })

  test('both username and password must be given', async () => {
    const newUser = {username: 'root'}
    await api.post(config.USER_URL).send(newUser).expect(400)
  })

  test('no username nor password given', async () => {
    const newUser = {}
    await api.post(config.USER_URL).send(newUser).expect(400)
  })

  test('both username and password must be at least 3 characters long', async () => {
    const newUser = {username: 'ro', password: 'ot'}
    await api.post(config.USER_URL).send(newUser).expect(400)
  })

  test('username must be unique', async () => {
    const newUser = {username: 'ro', password: 'ot'}
    await api.post(config.USER_URL).send(newUser).expect(400)
  })

  test('should return 400, if contains empty spaces', async () => {
    const newUser = {username: '     ', password: '     '}
    await api.post(config.USER_URL).send(newUser).expect(400)
  })
})

describe.skip('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({}).lean().exec()

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

    await api.post(config.USER_URL).send(newUser).expect(201)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await getUsersInDb()

    const newUser = {username: 'root', name: 'Superuser', password: 'salainen'}

    const result = await api
      .post(config.USER_URL)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await getUsersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
*/
