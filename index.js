const express = require('express')
const routes = require('./Config/routes')
const requestCount = require('./Middleware/requestCount')

const app = express()

app.use(express.json())
app.use(requestCount)

routes(app)

module.exports = app


