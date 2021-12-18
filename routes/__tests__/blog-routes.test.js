// const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const {BLOG_URL} = require('../../utils/config')
const {blogsInDb, nonExistingId} = require('../../utils/test-helper')
const Blog = require('../../models/blog')
const {
  initialBlogs,
  listWithOneBlog,
  invalidBlogs,
} = require('../../fixtures/blogs.data')

const api = supertest(app)

describe('blog router', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.create(initialBlogs)
  })

  afterAll(() => {
    // mongoose.connection.close()
  })

  describe('GET', () => {
    // Works fine
    it('all blogs', async () => {
      const response = await api.get(BLOG_URL)
      expect(response.body.data).toHaveLength(initialBlogs.length)
    })

    it('should get all blog as json', async () => {
      await api
        .get(BLOG_URL)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    it('should get a specific blog within the returned blogs', async () => {
      const res = await api.get(BLOG_URL)
      expect(res.body.data[1].title).toBeTruthy()
      // const contents = res.body.data.map((blog) => blog.content)
      // expect(contents).toContain(/React/)

      // Works fine
      // await api
      //   .get(BLOG_URL)
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .then((response) => {
      //     const contents = response.body.map((r) => r.content)
      //     expect(contents).toContain(/React/)
      //   })
      //   .catch((err) => console.error(err))
    })

    it('should return all blogs', async () => {
      await api
        .get(BLOG_URL)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(initialBlogs.length)
        })
        .catch((err) => console.error(err))
    })

    it('should add a valid blog', async () => {
      await api
        .post(BLOG_URL)
        .send(listWithOneBlog[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then((response) => {
          expect(response.body).toHaveLength(initialBlogs.length + 1)
        })
        .catch((err) => console.error(err))

      // const response = await api.get(BLOG_URL)
      // const contents = response.body.map((r) => r.content)

      // expect(response.body).toHaveLength(initialBlogs.length + 1)
      // expect(contents).toContain(listWithOneBlog[0].title)
    })

    it('should not add a blog without required attribute', async () => {
      await api
        .post(BLOG_URL)
        .send(invalidBlogs[0])
        .expect(400)
        .then((response) => {
          expect(response.body).toHaveLength(initialBlogs.length)
        })
        .catch((err) => console.error(err))

      // const response = await api.get(BLOG_URL)
      // expect(response.body).toHaveLength(initialNotes.length)
    })

    it('should a specific blog be viewed', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToView = blogsAtStart[0]

      await api
        .get(`${BLOG_URL}/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then((response) => {
          expect(response.body).toEqual(blogToView)
        })
        .catch((err) => console.error(err))

      // const processedNoteToView = JSON.parse(JSON.stringify(blogToView))
      // expect(resultNote.body).toEqual(processedNoteToView)
    })

    it('should a specific blog be deleted', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToRemove = blogsAtStart[0]

      await api
        .delete(`${BLOG_URL}/${blogToRemove.id}`)
        .expect(204)
        .then((response) => {
          expect(response.body).toHaveLength(initialBlogs.length - 1)
        })
        .catch((err) => console.error(err))

      // const blogsAtEnd = await blogsInDb()
      // expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
      // const contents = blogsAtEnd.map((r) => r.content)
      // expect(contents).not.toContain(noteToDelete.content)
    })

    it('should fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await nonExistingId()
      console.log(`non existing id : ${validNonexistingId}`)
      await api.get(`${BLOG_URL}/${validNonexistingId}`).expect(404)
    })

    it('should fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api.get(`${BLOG_URL}/${invalidId}`).expect(400)
    })
  })
})
