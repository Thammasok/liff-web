const path = require('path')
const express = require('express')
var dotenv = require('dotenv')
const morgan = require('morgan')

// Load environment variables from .env file
dotenv.load();

const PORT = process.env.PORT || 3210

const app = express()

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

// Serve static assets
app.use(express.static(path.resolve(__dirname, '.', 'build')))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html'))
})

app.listen(PORT, function () {
  console.log(`Express server listening on port  ${PORT}`)
})

module.exports = app