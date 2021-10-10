const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {PORT} = require('./utils/config')

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
