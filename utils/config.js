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

// endpoint url
const BASE_URL = process.env.BASE_URL
const BLOG_URL = process.env.BLOG_URL
const LOGIN_URL = process.env.LOGIN_URL
const NOTE_URL = process.env.NOTE_URL
const PERSON_URL = process.env.PERSON_URL
const USER_URL = process.env.USER_URL

module.exports = {
  MONGODB_URI,
  PORT,
  PROTOCOL,
  HOST,
  DB_PORT,
  DATABASE_NAME,
  BASE_URL,
  BLOG_URL,
  LOGIN_URL,
  NOTE_URL,
  PERSON_URL,
  USER_URL,
}
