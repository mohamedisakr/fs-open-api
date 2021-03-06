/*
 *  refactoring according to Separate Express 'app' and 'server'
 *  https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/separateexpress.md
 */
const http = require('http')
const app = require('./app')
const {PORT, BASE_URL} = require('./utils/config')

const port = PORT ?? 5000
app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running at ${BASE_URL}`)
})

//#region old code

/*
// require('dotenv').config()
// require('express-async-errors')
// const compression = require('compression')
// const express = require('express')
// const app = express()

// const helmet = require('helmet')

// const cors = require('cors')
// const morgan = require('morgan')
// const multer = require('multer')

// app.use(compression())

// const mainApp = require('./app')
// const config = require('./utils/config')
// const {info} = require('./utils/logger')

// use gzip compression - as expressjs.com suggest for production best practices

// helmet protect app from some well-known web vulnerabilities
// pause helmet for development
// app.use(helmet())

// app.use(cors())
// app.use(morgan('combined'))
// app.use(express.static('build'))
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(multer().none())

app.use(mainApp)

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})
*/

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

//#endregion
