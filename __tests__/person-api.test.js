// const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const url = '/api/persons'
const info = '/api/info'

describe('endpoint', () => {
  test('should get persons info - # of persons', async () => {
    await api.get(info).expect(200)
  })

  test('should get all persons', async () => {
    await api.get(url).expect(200)
    //   .expect('Content-Type', /application\/json/)
  })
})
