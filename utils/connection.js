const config = require('./config')
const {connectionOptions} = require('./constants')
const mongoose = require('mongoose')

mongoose
  .connect(config.MONGODB_URI, connectionOptions)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

mongoose.set('toJSON', {virtuals: true})
mongoose.set('toObject', {virtuals: true})

/**
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
 */
