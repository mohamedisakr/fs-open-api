/*
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const api = require('../utils/common')
const User = require('../models/user')
const Blog = require('../models/blog')
const {blogsInDb} = require('./blog-helper')
const helper = require('./test_helper')
// const {initialBlogs} = require('../fixtures/blogs.data')
// const {getUsersInDb} = require('./user-helper')

const {SECRET, BLOG_URL} = require('../utils/config') //'/api/blogs'

describe.skip('blogs', () => {
  let globals = {}

  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const newUsers = await User.create(helper.initialUsers)
    const savedUsers = await helper.getUsersInDb()

    const userForAllBlogs = {
      username: savedUsers[0].username,
      id: savedUsers[0].id,
    }

    const userForNoBlogs = {
      username: savedUsers[1].username,
      id: savedUsers[1].id,
    }

    const token = await jwt.sign(userForAllBlogs, SECRET)
    const unauthorizedToken = await jwt.sign(userForNoBlogs, SECRET)

    globals.token = `Bearer ${token}`
    globals.tokenId = userForAllBlogs.id
    globals.unauthorizedToken = `Bearer ${unauthorizedToken}`

    const validUserId = savedUsers[0].id

    const newBlogs = helper.initialBlogs.map((blog) => ({
      ...blog,
      author: validUserId,
    }))

    await Blog.create(newBlogs)
  })

  test('blogs are returned as json', async () => {
    await api.get(BLOG_URL).expect(200).expect('Content-Type', /json/) ///application\
  })

  test('all blogs are returned', async () => {
    const response = await api.get(BLOG_URL)
    expect(response.body).toHaveLength(helper.initialBlogs.length) //(initialBlogs.length)
  })

  // verifies that the unique identifier property of the blog posts is
  // named id, by default the database names the property _id.
  // Verifying the existence of a property is easily done with Jest's
  // toBeDefined matcher.
  test('verifies that the unique identifier property of the blog posts is named id', async () => {
    const newBlog = {
      title: 'full stack is very interesting',
      author: globals.tokenId,
      url: 'example.com',
      likes: 0,
    }

    await api
      .post(BLOG_URL)
      .set('Authorization', globals.token)
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
      author: globals.tokenId,
      url: 'example.com',
      likes: 0,
    }

    await api
      .post(BLOG_URL)
      .set('Authorization', globals.token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // const blogsAtEnd = await blogsInDb()
    // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('verifies that if the likes property is missing, default to 0', async () => {
    const newBlog = {
      title: 'Intro to Web API',
      author: globals.tokenId,
      url: 'example.com/intro-to-web-api',
    }

    await api
      .post(BLOG_URL)
      .set('Authorization', globals.token)
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
    const newBlog = {author: globals.tokenId}

    await api
      .post(BLOG_URL)
      .set('Authorization', globals.token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with status 401 if unauthenticated', async () => {
    const blogsAtStart = await helper.getBlogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`${BLOG_URL}/${blogToDelete.id}`)
      .set('Authorization', globals.token)
      .send()
      .expect(401)
    // .set('Authorization', `Bearer ${globals.token}`)
    // .set('x-auth-token', globals.token)
  })

  // ====================================
  // TODO: SOLVE THE STATUS CODE PROBLEM
  // ====================================
  test.skip('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(`token : ${globals.token}`)
    await api
      .delete(`${BLOG_URL}/${blogToDelete.id}`)
      .set('Authorization', globals.token)
      .send()
      // .set('Authorization', `Bearer ${globals.token}`)
      .expect(204)

    // const blogsAtEnd = await blogsInDb()
    // const titles = blogsAtEnd.map((r) => r.title)

    // expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)
    // expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
    // expect(titles).not.toContain(blogToDelete.title)
  })

  test('update blog success with status code 200', async () => {
    const blogsAtStart = await blogsInDb()
    // console.log(`all blogs : ${blogsAtStart}`)
    const firstBlog = blogsAtStart[0]
    // console.log(`first blog : ${firstBlog}`)
    const blogToUpdate = {...firstBlog, likes: 5}
    await api
      .put(`${BLOG_URL}/${firstBlog.id}`)
      .send(blogToUpdate)
      .set('Authorization', globals.token)
      .expect(200)
    expect(blogToUpdate.likes).toBeGreaterThanOrEqual(5)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
*/
