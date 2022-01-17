const pagination = (model) => {
  return async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const total = await model.countDocuments()

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const pagination = {}
    pagination.meta = {}

    pagination.meta.total = total
    pagination.meta.pages = Math.ceil(total / limit)
    pagination.meta.current = page

    if (endIndex < total) {
      pagination.meta.next = page + 1
    }

    if (startIndex > 0) {
      pagination.meta.previous = page - 1
    }

    try {
      pagination.results = await model
        .find({})
        .limit(limit)
        .skip(startIndex)
        .exec()
      res.results = pagination
      next()
    } catch (err) {
      console.log(err)
      res.status(500).json({message: err.message})
    }
  }
}

module.exports = pagination

// pagination.meta.previous = {
//   page: ,
//   limit,
// }

// pagination.meta.next = {
//   page: page + 1,
//   limit,
// }
