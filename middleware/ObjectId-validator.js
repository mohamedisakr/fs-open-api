const {Types} = require('mongoose')

const validateObjectId = (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({message: 'Invalid ID.'})
  }
  next()
}

module.exports = {validateObjectId}
