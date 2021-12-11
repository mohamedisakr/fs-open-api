const express = require('express')
const mainApp = express()

const config = require('./utils/config')
const homeRouter = require('./controllers/home')
const blogRouter = require('./routes/blog')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
// const registerRouter = require('./controllers/register')

mainApp.use(middleware.requestLogger)
mainApp.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

mainApp.use(homeRouter)

// app.use('/api/blogs', middleware.userExtractor, blogRouter)
mainApp.use(config.REGISTER_URL, usersRouter) //'/api/register'
mainApp.use(config.LOGIN_URL, loginRouter) //'/api/login'
mainApp.use(config.USER_URL, usersRouter) //'/api/users'
mainApp.use(config.BLOG_DETAILS_URL, blogRouter) //'/api/blogs/details'
mainApp.use(config.BLOG_URL, blogRouter) //'/api/blogs'
mainApp.use(config.NOTE_URL, notesRouter) //'/api/notes'
mainApp.use(config.PERSON_URL, personsRouter) // '/api/persons'
mainApp.use(config.INFO_URL, personsRouter) //'/api/info'

mainApp.use(middleware.unknownEndpoint)
mainApp.use(middleware.errorHandler)

module.exports = mainApp

//#region  old code

// require('dotenv').config()
// require('express-async-errors')
// const compression = require('compression')
// const express = require('express')
// const cors = require('cors')
// const morgan = require('morgan')
// const helmet = require('helmet')
// const multer = require('multer')

// const app = express()

// // use gzip compression - as expressjs.com suggest for production best practices
// app.use(compression())

// // helmet protect app from some well-known web vulnerabilities
// app.use(helmet())

// app.use(cors())
// app.use(morgan('combined'))
// app.use(express.static('build'))
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(multer().none())

//#endregion
