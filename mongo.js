const mongoose = require('mongoose')
const {connect, connection} = mongoose

const {PROTOCOL, HOST, DB_PORT, DATABASE_NAME} = require('./utils/config')
const {connectionOptions} = require('./utils/constants')
const uri = `${PROTOCOL}://${HOST}:${DB_PORT}/${DATABASE_NAME}`

connect(uri, connectionOptions)
  .then(() => {
    console.log('mongodb connnected')
  })
  .catch((err) => {
    console.log(err)
  })

const releaseConnection = (message, callback) => {
  connection.close(() => {
    console.log(`Mongoose disconnected : ${message}`)
    callback()
  })
}

// Connection Events

// Emitted when Mongoose successfully makes its initial connection to the MongoDB server,
// or when Mongoose reconnects after losing connectivity.
// Equivalent to open event
connection.on('connected', () => {
  console.log(`Mongoose connected to MongoDB : ${uri}`)
})

// Emitted if an error occurs on a connection, like a parseError due to malformed data or
// a payload larger than 16MB.
connection.on('error', (err) => {
  console.error(`Mongoose connection error : ${err.message}`)
})

// Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your
// code explicitly closing the connection, the database server crashing, or network connectivity
// issues.
connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

// If the Node process ends, close the Mongoose connection
// nodemon
process.once('SIGUSR2', () => {
  releaseConnection('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2')
  })
})

// node application termination
// Signal      Standard   Action   Comment
// SIGINT       P1990      Term    Interrupt from keyboard
process.on('SIGINT', () => {
  releaseConnection('app termination', () => {
    process.exit(0)
  })
})

// exit the Node like application termination
// Signal      Standard   Action   Comment
// SIGTERM      P1990      Term    Termination signal
process.on('SIGTERM', () => {
  releaseConnection('Heroku app shutdown', () => {
    process.exit(0)
  })
})
