const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('notes', {content: 1, date: 1})
    .lean()
    .exec()
  // const users = await User.find({}).lean().exec()
  response.json(users)
})

usersRouter.delete('/', async (request, response) => {
  const users = await User.deleteMany({}).lean().exec()
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  //   const user = new User({username, name, passwordHash})
  //   const savedUser = await user.save()

  const savedUser = User.create({username, name, passwordHash})
  response.json(savedUser)
})

module.exports = usersRouter
