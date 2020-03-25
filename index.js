const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const server = express()

const port = process.env.PORT || 5000

require('dotenv').config()

if(process.env.NODE_ENV === "production"){
    server.use(express.static('client/build'));
    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
}

server.use(express.json())
server.use(cookieParser())
server.use(cors())

server.get('/', (req, res, next) => {
    res.json({
        message: "Welcome"
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017'
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true}
);

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})