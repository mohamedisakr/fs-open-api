require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

const config = require('./utils/config')
const homeRouter = require('./controllers/home')
const blogRouter = require('./routes/blog')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
// const registerRouter = require('./controllers/register')

// let helmet protect app from some well-known web vulnerabilities
app.use(helmet())

app.use(cors())
app.use(morgan('combined'))
app.use(express.static('build'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.use(homeRouter)

// app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use(config.REGISTER_URL, usersRouter) //'/api/register'
app.use(config.LOGIN_URL, loginRouter) //'/api/login'
app.use(config.USER_URL, usersRouter) //'/api/users'
app.use(config.BLOG_DETAILS_URL, blogRouter) //'/api/blogs/details'
app.use(config.BLOG_URL, blogRouter) //'/api/blogs'
app.use(config.NOTE_URL, notesRouter) //'/api/notes'
app.use(config.PERSON_URL, personsRouter) // '/api/persons'
app.use(config.INFO_URL, personsRouter) //'/api/info'

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
