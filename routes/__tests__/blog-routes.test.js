const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const {BLOG_URL} = require('../../utils/config')
// const blogRouter = require('../blog')

const api = supertest(app)

describe('blog router', () => {
  describe('GET', () => {
    it('should get all blog as json', async () => {
      await api
        .get(BLOG_URL)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })
})
