const mongoose = require('mongoose')
const Blog = require('../models/blog')
const {initialBlogs} = require('../fixtures/blogs.data')
const {blogsInDb} = require('./blog-helper')
const {getUsersInDb} = require('./user-helper')

const api = require('../utils/common') //supertest(app)
const {BLOG_URL} = require('../utils/config') //'/api/blogs'

describe('blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    // create user and get its token
    // extract user id from token
    // update each item author in initialBlogs to user id
    await Blog.create(initialBlogs)
  })

  test.only('blogs are returned as json', async () => {
    await api
      .get(BLOG_URL)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(BLOG_URL)
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
      .post(BLOG_URL)
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
      .post(BLOG_URL)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  })

  test('verifies that if the likes property is missing, default to 0', async () => {
    const newBlog = {
      title: 'Intro to Web API',
      author: 'Mohamed Sakr',
      url: 'example.com/intro-to-web-api',
    }

    await api
      .post(BLOG_URL)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await blogsInDb()
    const theBlog = allBlogs.find(
      (blog) => blog.title.toLowerCase() === newBlog.title.toLowerCase(),
    )
    expect(theBlog.likes).toBe(0)
  })

  test('verifies if title & url are missing, responds to the request with status code 400 Bad Request', async () => {
    const newBlog = {author: 'Mohamed Sakr'}

    await api
      .post(BLOG_URL)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('delete blog succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`${BLOG_URL}/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogsInDb()
    const titles = blogsAtEnd.map((r) => r.title)

    expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('update blog success with status code 200', async () => {
    const blogsAtStart = await blogsInDb()
    console.log(`all blogs : ${blogsAtStart}`)
    const firstBlog = blogsAtStart[0]
    console.log(`first blog : ${firstBlog}`)
    const blogToUpdate = {...firstBlog, likes: 5}
    await api.put(`${BLOG_URL}/${firstBlog.id}`).send(blogToUpdate).expect(200)
    expect(blogToUpdate.likes).toBeGreaterThanOrEqual(5)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
