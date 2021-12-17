const {Types} = require('mongoose')

const isValidObjectId = (id) => {
  if (!Types.ObjectId.isValid(id)) {
    return false
  }
  return true
}

module.exports = {isValidObjectId}
