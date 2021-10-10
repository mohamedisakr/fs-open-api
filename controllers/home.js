const homeRouter = require('express').Router()

homeRouter.get('/', (request, response) => {
  //   const header = JSON.stringify('<h1>API Home Page</h1>')
  response.status(200).json({message: '<h1>API Home Page</h1>'})
})

module.exports = homeRouter
