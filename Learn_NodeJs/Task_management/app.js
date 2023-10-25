//
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
require('dotenv').config()
//
const connectDB = require('./db/connect')
//
const notFound = require('./middlewares/not-found')
const customHandlerMiddleware = require('./middlewares/error-handler')
// middlewares
app.use(express.static('./public'))
app.use(express.json())

// routes
//
//

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(customHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on ${port}`))
  } catch (error) {
    console.log(error.message)
  }
}

start()
