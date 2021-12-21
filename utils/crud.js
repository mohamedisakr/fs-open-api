const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

module.exports = getOne = (model) => async (req, res, next) => {
  const {id} = req.params
  try {
    const doc = await model
      .findOne({_id: ObjectId(id)})
      .lean()
      .exec()

    if (!doc) {
      return res.status(404).end()
    }

    res.status(200).json({data: doc})
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = getMany = (model) => async (req, res, next) => {
  try {
    const docs = await model.find({}).lean().exec()

    res.status(200).json({data: docs})
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = createOne = (model) => async (req, res, next) => {
  try {
    const doc = await model.create({...req.body})
    res.status(201).json({data: doc})
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = updateOne = (model) => async (req, res, next) => {
  const {id} = req.params
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: ObjectId(id),
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

module.exports = removeOne = (model) => async (req, res, next) => {
  const {id} = req.params
  try {
    const removed = await model.findOneAndRemove({_id: ObjectId(id)})

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
