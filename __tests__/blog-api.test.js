const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {initialBlogs} = require('../fixtures/blogs.data')
const {nonExistingId, blogsInDb} = require('./blog-helper')

const api = supertest(app)
const url = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.create(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get(url)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get(url)
  expect(response.body).toHaveLength(initialBlogs.length)
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

test('verifies that making an HTTP POST successfully creates a new blog post.', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Mohamed Sakr',
    url: 'example.com',
    likes: 0,
  }

  await api
    .post(url)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  // const titles = blogsAtEnd.map((n) => n.title)
  // expect(titles).toContain(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
