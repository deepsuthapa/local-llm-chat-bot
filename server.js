
const express = require('express')
const app = express()

const cors = require('cors')

const { router } = require('./routes/router')
const PORT = 3000

const allowedOrigin = [
    "http://localhost:4200",
    "http://192.168.1.66:4200"
]

app.use(cors({
    origin: allowedOrigin,
}))

app.use(express.json())

app.use('/', router)

try {
    app.listen(PORT, () => {
        console.log('server running at 3000')
    })
} catch (error) {
    console.log("Error: ", error)
}