const paginatedResults = async (model) => {
  return async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const total = await model.countDocuments()

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const pagination = {}
    pagination.meta = {}

    pagination.meta.total = total
    pagination.meta.pages = total / limit

    if (endIndex < total) {
      pagination.meta.next = {
        page: page + 1,
        limit,
      }
    }

    if (startIndex > 0) {
      pagination.meta.previous = {
        page: page - 1,
        limit,
      }
    }

    pagination.results = await model
      .find({})
      .limit(limit)
      .skip(startIndex)
      .exec()
    res.results = pagination
    next()
  }
}

module.exports = paginatedResults
