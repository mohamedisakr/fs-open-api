const {blogToBeDeleted} = require('../fixtures/blogs.data')
const Blog = require('../models/blog')

const nonExistingId = async () => {
  const blog = new Blog({content: 'willremovethissoon', date: new Date()})
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({}).lean().exec()
  return blogs
}

module.exports = {
  nonExistingId,
  blogsInDb,
}
