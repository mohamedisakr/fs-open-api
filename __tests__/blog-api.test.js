const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {initialNotes} = require('../fixtures/blogs.data')
const {nonExistingId, blogsInDb} = require('./blog-helper')

const api = supertest(app)
const url = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.create(initialNotes)
})

// writing a test that makes an HTTP GET request to the /api/blogs url.
// Verify that the blog list application returns the correct amount of
// blog posts in the JSON format.

test('blogs are returned as json', async () => {
  await api
    .get(url)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get(url)
  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
})
