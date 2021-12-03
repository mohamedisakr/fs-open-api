module.exports = getOne = (model) => async (req, res) => {
  const {id} = req.params
  try {
    const doc = await model.findOne({_id: id}).lean().exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({data: doc})
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find({}).lean().exec()

    res.status(200).json({data: docs})
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create({...req.body})
    res.status(201).json({data: doc})
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = updateOne = (model) => async (req, res) => {
  const {id} = req.params
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: id,
        },
        req.body,
        {new: true},
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({data: updatedDoc})
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = removeOne = (model) => async (req, res) => {
  const {id} = req.params
  try {
    const removed = await model.findOneAndRemove({_id: id})

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({data: removed})
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})

module.exports = crudControllers
