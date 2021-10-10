// const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const config = require('../utils/config')
const url = '/api/persons'
const info = '/api/info'

describe('endpoint', () => {
  test('should get persons info - # of persons', async () => {
    await api.get(config.INFO_URL).expect(200)
  })

  test('should get all persons', async () => {
    await api.get(config.PERSON_URL).expect(200)
    //   .expect('Content-Type', /application\/json/)
  })
})
