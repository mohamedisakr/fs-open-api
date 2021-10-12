const registerRouter = require('express').Router()
const User = require('../models/user')

registerRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body

  // Both username and password must be given.
  if (isEmpty(username) === true) {
    return response.status(400).json({error: 'username is required'})
  }

  if (isEmpty(password) === true) {
    return response.status(400).json({error: 'password is required'})
  }

  // Both username and password must be at least 3 characters long.
  if (hasMinimumLength(username, 3) === false) {
    return response
      .status(400)
      .json({error: 'username must be at least 3 characters'})
  }

  if (hasMinimumLength(password, 3) === false) {
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

  const savedUser = User.create({username, name, passwordHash})
  response.status(201).json(savedUser)
})

module.exports = registerRouter
