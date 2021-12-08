require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

const config = require('./utils/config')
const homeRouter = require('./controllers/home')
const blogRouter = require('./routes/blog') // require('./controllers/blog')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')
const personsRouter = require('./controllers/persons')
// const registerRouter = require('./controllers/register')

const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')
// const mongoose = require('mongoose')

// const {connectionOptions} = require('./utils/constants')
// logger.info(`connecting to database : ${config.MONGODB_URI}`)

// mongoose
//   .connect(config.MONGODB_URI, connectionOptions)
//   .then(() => {
//     logger.info('connected to MongoDB')
//   })
//   .catch((error) => {
//     logger.error('error connecting to MongoDB:', error.message)
//   })

app.use(cors())
app.use(morgan('combined'))
app.use(express.static('build'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.get('/', homeRouter)
// app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use(config.REGISTER_URL, usersRouter) //'/api/register'
app.use(config.LOGIN_URL, loginRouter) //'/api/login'
app.use(config.USER_URL, usersRouter) //'/api/users'
app.use(config.BLOG_DETAILS_URL, blogRouter) //'/api/blogs/details'
app.use(config.BLOG_URL, blogRouter) //'/api/blogs'
app.use(config.NOTE_URL, notesRouter) //'/api/notes'
app.use(config.PERSON_URL, personsRouter) // '/api/persons'
app.use(config.INFO_URL, personsRouter) //'/api/info'

// 405 Method Not Allowed routes
// HEAD Request Method
app.head('/', (req, res) => {
  res.status(405).send('The request method HEAD is inappropriate for the URL')
})

// TRACE Request Method
app.trace('/', (req, res) => {
  res.status(405).send('The request method TRACE is inappropriate for the URL')
})

// OPTIONS Request Method
app.options('/', (req, res) => {
  res
    .status(405)
    .send('The request method OPTIONS is inappropriate for the URL')
})

// PATCH Request Method
app.patch('/', (req, res) => {
  res.status(405).send('The request method PATCH is inappropriate for the URL')
})

// PURGE Request Method
app.purge('/', (req, res) => {
  res.status(405).send('The request method PURGE is inappropriate for the URL')
})

// COPY Request Method
app.copy('/', (req, res) => {
  res.status(405).send('The request method COPY is inappropriate for the URL')
})

// LINK Request Method
app.link('/', (req, res) => {
  res.status(405).send('The request method LINK is inappropriate for the URL')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
