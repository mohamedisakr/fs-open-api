const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).lean().exec()
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
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
