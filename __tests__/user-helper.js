const faker = require('faker')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const generateNewUserFaker = () => {
  return {
    username: faker.internet.userName(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    password: faker.internet.password(),
  }
}

module.exports = {usersInDb, generateNewUserFaker}

// const newUser = {
//   username: 'mluukkai',
//   name: 'Matti Luukkainen',
//   password: 'salainen',
// }
