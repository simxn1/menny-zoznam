const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.NODE_PORT || 80

app.use(cors({ credentials: true, origin: SERVER_IP }))
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', () => {
    console.log('mongoDB connection successful')
})

const clientsRouter = require('./routes/clients')

app.use('/clients', clientsRouter)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
