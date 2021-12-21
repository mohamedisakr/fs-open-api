require('./connection')
const createOne = (model, objects) => {
  try {
    const doc = await model.create({...objects})
    return doc
  } catch (e) {
    console.error(e)
  }
}

const deleteMany = async (model) => {
  try {
    const docs = await model.deleteMany({}).exec()
    return docs
  } catch (e) {
    console.error(e)
  }
}

module.exports = {createOne, deleteMany}
