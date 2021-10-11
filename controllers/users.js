const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .select({passwordHash: false}) // exclude `passwordHash`
    .populate('notes', {content: 1, date: 1})
    .populate('blogs', {title: 1, likes: 1})
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

  // Both username and password must be given.
  if (!username) {
    return response.status(400).json({error: 'username is required'})
  }

  if (!password) {
    return response.status(400).json({error: 'password is required'})
  }

  // Both username and password must be at least 3 characters long.
  if (username.length < 3) {
    return response
      .status(400)
      .json({error: 'username must be at least 3 characters'})
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({error: 'password must be at least 3 characters'})
  }

  // The username must be unique.
  const duplicatedUser = await User.findOne({username: username}).lean().exec()
  console.log(`duplicated user : ${duplicatedUser}`)
  if (duplicatedUser) {
    return response.status(400).json({error: 'username must be unique'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  //   const user = new User({username, name, passwordHash})
  //   const savedUser = await user.save()

  const savedUser = User.create({username, name, passwordHash})
  response.status(200).json(savedUser)
})

module.exports = usersRouter
