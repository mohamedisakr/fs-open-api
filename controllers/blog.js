const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/details', async (request, response) => {
  try {
    const blogs = await Blog.find({}).exec()
    const result = {data: blogs, totalblogs: blogs.length}
    return response.status(200).json(result)
  } catch (error) {
    console.error(error)
    return response.status(500).json({message: 'server error'})
  }
})

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
      .sort({likes: 'desc'})
      .populate('user', {username: 1, name: 1})
      // .lean() // Note: does not return blog id
      .exec()
    // .select({_id: true, title: true})
    // .populate('user', {name: 1})

    response.json(blogs)
  } catch (error) {
    console.error(error)
  }
})

blogRouter.get('/:id', async (request, response) => {
  const {id} = request.params
  try {
    const blog = await Blog.findById(id).exec()
    console.log(``)
    response.status(200).json(blog)
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
    user: user.id,
  }
  const blog = new Blog(blogNewObject)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const {id} = request.params
    console.log(`blog id for deleting : ${id}`)
    // check if blog will be deleted with by a wrong user
    const blogToDelete = await Blog.findById(id)
    // if (blogToDelete.user.toString() !== request.user) {
    // if (blogToDelete.user.toString() !== request.user.toString()) {
    if (blogToDelete.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({error: 'wrong author'})
    }

    const user = await User.findById(decodedToken.id)
    await Blog.findByIdAndRemove(id)

    user.blogs = user.blogs.filter((blog) => blog.id !== id)
    await user.save()

    response.status(204).end()
  } catch (error) {
    console.error(error)
  }
})

blogRouter.put('/:id', async (request, response) => {
  const {id} = request.params
  const blogToUpdate = request.body
  // const updatedNote = await Blog.findByIdAndUpdate(id, blogToUpdate, {
  //   new: true,
  // })

  const updatedNote = await Blog.findByIdAndUpdate(
    id,
    {$set: {...blogToUpdate}, $inc: {likes: 1}},
    {
      new: true,
    },
  )

  response.status(201).json(updatedNote)
})

module.exports = blogRouter
