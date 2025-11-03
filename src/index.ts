import express from "express";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const portNum = process.env["PORT_NUMBER"] ?? 5000

app.listen(portNum, () => {
    console.log('Server listening on localhost:' + portNum)
})