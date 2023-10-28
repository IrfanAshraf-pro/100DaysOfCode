// console.log('04 Store API')
require('dotenv').config()
require('express-async-errors')
// async error
const express = require('express')
const connectDB = require('./db/connect')
//
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
// router
const productRouter = require('./routes/products')
// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">Go To Products</a>')
})

app.use('/api/v1/products', productRouter)

// products routes

//
app.use(notFoundMiddleware)
app.use(errorMiddleware)

//
const port = process.env.PORT || 3000
const start = async () => {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening to port ${port}...`))
  } catch (error) {
    console.log(error.message)
  }
}
start()
