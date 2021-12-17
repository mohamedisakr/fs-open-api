const {Types} = require('mongoose')

module.exports = function validateObjectId(req, res, next) {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({message: 'Invalid ID.'})
  }
  next()
}
