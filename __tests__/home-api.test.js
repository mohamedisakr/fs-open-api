const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const url = '/'

describe('homepage endpoint', () => {
  test('should get homepage', async () => {
    await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('non-existing endpoint', () => {
  test('should get unknown endpoint error', async () => {
    await api
      .get('/no-res')
      .expect(404)
      .expect('Content-Type', /application\/json/)
  })
})
