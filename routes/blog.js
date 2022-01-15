const {Router} = require('express')
const controllers = require('../controllers/blog')
const {getBlogDetailsWithCount} = require('../controllers/blog')
const {validateObjectId} = require('../middleware/ObjectId-validator')
const paginatedResults = require('../middleware/pagination')

const router = Router()
// const allBlogs = controllers.getMany().data

// /api/blogs
router
  .route('/')
  .get(controllers.getMany)
  // .get(paginatedResults, controllers.getMany)
  // .get(paginatedResults(controllers.getMany()), controllers.getMany)
  .post(controllers.createOne)

// /api/blogs/:id
router
  .route('/:id')
  .get(validateObjectId, controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

// /api/blogs/details
router.route('/details').get(getBlogDetailsWithCount)

module.exports = router
