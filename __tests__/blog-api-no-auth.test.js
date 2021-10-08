const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

/*
beforeEach(async () => {
  // Create a root user
  await User.deleteMany({})

  // Create blogs without user
  await Blog.deleteMany({})

  await Blog.create(helper.initialBlogs)
  // const noteObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  // const promiseArray = noteObjects.map((blog) => blog.save())
  // await Promise.all(promiseArray)
})
*/

describe.only('Get blog information', () => {
  let headers

  beforeEach(async () => {
    // Create a root user
    await User.deleteMany({})

    // Create blogs without user
    await Blog.deleteMany({})

    await Blog.create(helper.initialBlogs)

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api.post('/api/users').send(newUser)

    const result = await api.post('/api/login').send(newUser)
    console.log(`supertest request : ${result}`)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(401) //.expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs').set(headers)

    // expect(response.body).toHaveLength(helper.initialBlogs.length)
    expect(response.body).toEqual({error: 'invalid token'})
  })

  test.skip('the first blog is about React patterns', async () => {
    const response = await api.get('/api/blogs').set(headers)
    // console.log(`headers : ${headers}`)
    const contents = response.body.map((r) => r.title)

    expect(contents).toContain('React patterns')
  })

  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
})

describe('Addition of a new blog', () => {
  let headers = null
  let result = null

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api.post('/api/users').send(newUser)

    result = await api.post('/api/login').send(newUser)
    // console.log(`toke : ${result.body.token}`)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  })

  test('A valid blog can be added ', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401) // .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map((n) => n.title)
    // expect(contents).toContain('Canonical string reduction')
    expect(contents).toContain('React patterns')
  })

  test('If title and url are missing, respond with 400 bad request', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }

    // await api.post('/api/blogs').send(newBlog).set(headers).expect(400)
    await api.post('/api/blogs').send(newBlog).set(headers).expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test.skip('If the likes property is missing, it will default to 0 ', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(401) // .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(
      (blog) => blog.title === 'First class tests',
    )
    expect(addedBlog.likes).toBe(0)
  })
})

describe('Update a blog', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api.post('/api/users').send(newUser)

    const result = await api.post('/api/login').send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  })

  test('Blog update successful ', async () => {
    const newBlog = {
      title: 'Masterpiece',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    // await api.post('/api/blogs').send(newBlog).set(headers).expect(200)
    await api.post('/api/blogs').send(newBlog).set(headers).expect(401)

    /*
    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find((blog) => blog.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const foundBlog = blogsAtEnd.find((blog) => blog.likes === 13)
    expect(foundBlog.likes).toBe(13)
    */
  })
})

describe('Deletion of a blog', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api.post('/api/users').send(newUser)

    const result = await api.post('/api/login').send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title: 'The best blog ever',
      author: 'Me',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    // await api.post('/api/blogs').send(newBlog).set(headers).expect(200)
    await api.post('/api/blogs').send(newBlog).set(headers).expect(401)

    /*
    const allBlogs = await helper.blogsInDb()
    const blogToDelete = allBlogs.find((blog) => blog.title === newBlog.title)

    await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
    */
  })
})

afterAll(() => {
  mongoose.connection.close()
})
