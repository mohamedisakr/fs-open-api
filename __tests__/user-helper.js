const faker = require('faker')
const User = require('../models/user')

const getUsersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const generateNewUserFaker = () => {
  return {
    username: faker.internet.userName(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    // password: faker.internet.password(),
  }
}

const generate100Customers = () => {
  let result = []
  for (let i = 0; i < 100; i++) {
    let user = generateNewUserFaker()
    result.push(user)
  }
  return result
}

const result = generate100Customers()
console.log(result)

module.exports = {getUsersInDb, generateNewUserFaker}

// const newUser = {
//   username: 'mluukkai',
//   name: 'Matti Luukkainen',
//   password: 'salainen',
// }
