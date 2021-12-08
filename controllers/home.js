const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({message: 'API Home Page'})
})

// 405 Method Not Allowed routes
// HEAD Request Method
router.head('/', (req, res) => {
  res.status(405).send('The request method HEAD is inappropriate for the URL')
})

// TRACE Request Method
router.trace('/', (req, res) => {
  res.status(405).send('The request method TRACE is inappropriate for the URL')
})

// OPTIONS Request Method
router.options('/', (req, res) => {
  res
    .status(405)
    .send('The request method OPTIONS is inappropriate for the URL')
})

// PATCH Request Method
router.patch('/', (req, res) => {
  res.status(405).send('The request method PATCH is inappropriate for the URL')
})

// PURGE Request Method
router.purge('/', (req, res) => {
  res.status(405).send('The request method PURGE is inappropriate for the URL')
})

// COPY Request Method
router.copy('/', (req, res) => {
  res.status(405).send('The request method COPY is inappropriate for the URL')
})

// LINK Request Method
router.link('/', (req, res) => {
  res.status(405).send('The request method LINK is inappropriate for the URL')
})

module.exports = router
