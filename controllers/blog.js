const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
      // .populate('user', {name: 1})
      .lean()
      .exec()
    response.json(blogs)
    // .select({author: false})
  } catch (error) {
    console.error(error)
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)

  console.log(`user : ${user}`)

  const blogNewObject = {
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id,
  }
  const blog = new Blog(blogNewObject)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  const {id} = request.params
  // check if blog will be deleted with by a wrong user
  const blogToDelete = await Blog.findById(id)
  if (blogToDelete.author.toString() !== request.user) {
    return response.status(401).json({error: 'wrong author'})
  }

  const user = await User.findById(decodedToken.id)
  await Blog.findByIdAndRemove(id)

  user.blogs = user.blogs.filter((blog) => blog.id !== id)
  await user.save()

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const {id} = request.params
  const blogToUpdate = request.body
  const updatedNote = await Blog.findByIdAndUpdate(id, blogToUpdate, {
    new: true,
  })
  response.json(updatedNote)
})

module.exports = blogRouter
