require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const homeRouter = require('./controllers/home')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')
const personsRouter = require('./controllers/persons')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const {connectionOptions} = require('./utils/constants')
logger.info(`connecting to database : ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI, connectionOptions)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.get('/', homeRouter)
app.use('/api/notes', notesRouter)
// app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/persons', personsRouter)
app.use('/api/info', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
