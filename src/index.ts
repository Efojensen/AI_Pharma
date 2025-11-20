import express from "express";
import authRoutes from './routes/auth'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const portNum = process.env["PORT_NUMBER"] ?? 5000

app.use('/auth', authRoutes)

app.listen(portNum, () => {
    console.log('Server listening on localhost:' + portNum)
})