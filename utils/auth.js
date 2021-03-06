const {SECRET, JWT_EXPIRY_PERIOD} = require('./config')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const generateAuthToken = (req, res, next) => {
  // get token from req header
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).json({message: 'Access denied. No token provided'})
  }

  // verify token against jwt key
  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.error(error)
    res.status(400).json({message: 'Invalid token.'})
  }
}
const newToken = (user) => {
  return jwt.sign({id: user.id}, SECRET, {expiresIn: JWT_EXPIRY_PERIOD})
}

const verifyToken = (token) => {
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

const signup = async (req, res) => {
  try {
    const {email, password} = req.body

    // check for email exist
    if (!email) {
      return res.status(400).json({message: 'email required'})
    }

    // TODO: check for email validation

    // check for password exist
    if (!password) {
      return res.status(400).json({message: 'password required'})
    }

    // TODO: check for password validation

    // check if email already exist
    const user = await User.findOne({email})
    if (user) {
      return res.status(400).json({message: 'user already exist'})
    }

    // check if password match
    const passwordMatch = await user.checkPassword(password)
    if (!passwordMatch) {
      return res.status(401).json({message: 'invalid credentials'})
    }

    const userToAdd = await User.create({email, password})
    const token = newToken(userToAdd)
    return res.status(201).json(token)
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'server error', error: error.message})
  }
}

const signin = async (req, res) => {
  try {
    const {email, password} = req.body

    // check for email exist
    if (!email) {
      return res.status(400).json({message: 'email required'})
    }

    // TODO: check for email validation

    // check for password exist
    if (!password) {
      return res.status(400).json({message: 'password required'})
    }

    // TODO: check for password validation

    // check if email exists
    const user = await User.findOne({email}).exec()
    if (!user) {
      return res.status(401).json({message: 'user not authorized'})
    }

    // check if password match
    const passwordMatch = await user.checkPassword(password)
    if (!passwordMatch) {
      return res.status(401).json({message: 'user not authorized'})
    }

    const token = newToken(user)
    return res.status(200).json(token)
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'server error'})
  }
}

const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({message: 'No credentials sent!'})
  }

  let token = req.headers.authorization.split('Bearer ')[1]

  if (!token) {
    // return res.status(401).json({ message: 'user not authorized' })
    return res.status(403).json({message: 'No credentials sent!'})
  }

  try {
    const payload = await verifyToken(token)
    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec()
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({message: 'user not authorized'})
  }
}

module.exports = {
  generateAuthToken,
  newToken,
  verifyToken,
  signin,
  signup,
  protect,
}
