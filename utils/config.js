require('dotenv').config()

const PORT = process.env.PORT_URL
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const PROTOCOL = process.env.PROTOCOL
const HOST = process.env.HOST
const DB_PORT = process.env.DB_PORT
const DATABASE_NAME = process.env.DATABASE_NAME

module.exports = {MONGODB_URI, PORT, PROTOCOL, HOST, DB_PORT, DATABASE_NAME}
