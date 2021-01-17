require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database~~~~~~~~~\n"))

app.use(express.json())

const tasksRouter = require('./routes/tasks')
const columnsRouter = require('./routes/columns')
const columnOrderRouter = require('./routes/column-orders')

app.use('/tasks', tasksRouter)
app.use('/columns', columnsRouter)
app.use('/column-orders', columnOrderRouter)


app.listen(3001, () => console.log("Server Started!!!!!!!!!!!!!!!!!"))
