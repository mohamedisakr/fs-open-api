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

// verifies that the unique identifier property of the blog posts is
// named id, by default the database names the property _id.
// Verifying the existence of a property is easily done with Jest's
// toBeDefined matcher.
test('verifies that the unique identifier property of the blog posts is named id', async () => {
  const newBlog = {
    title: 'full stack is very interesting',
    author: 'Mohamed Sakr',
    url: 'example.com',
    likes: 0,
  }

  await api
    .post(url)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await blogsInDb()
  const theBlog = allBlogs.find(
    (blog) => blog.title.toLowerCase() === newBlog.title.toLowerCase(),
  )
  expect(theBlog.id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
