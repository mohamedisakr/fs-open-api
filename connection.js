const mongoose = require('mongoose')
const config = require('./utils/config')
const {connectionOptions} = require('./utils/constants')

const connectToDB = async () => {
  await mongoose
    .connect(config.MONGODB_URI, connectionOptions)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
    })
}

module.exports = {connectToDB}
