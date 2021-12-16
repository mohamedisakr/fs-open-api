require('dotenv').config()
require('express-async-errors')
const compression = require('compression')
const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const multer = require('multer')

app.use(compression())

const mainApp = require('./app')
const config = require('./utils/config')
const {info} = require('./utils/logger')

// use gzip compression - as expressjs.com suggest for production best practices

// helmet protect app from some well-known web vulnerabilities
app.use(helmet())

app.use(cors())
app.use(morgan('combined'))
app.use(express.static('build'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(multer().none())

app.use(mainApp)

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})

/*
const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const {info} = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})
*/
