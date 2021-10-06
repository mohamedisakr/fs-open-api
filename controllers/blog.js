const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).lean().exec()
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const {id} = request.params
  const blogToUpdate = request.body
  const updatedNote = await Blog.findByIdAndUpdate(id, blogToUpdate, {
    new: true,
  })
  response.json(updatedNote)
})

blogRouter.delete('/:id', async (request, response) => {
  const {id} = request.params
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = blogRouter
