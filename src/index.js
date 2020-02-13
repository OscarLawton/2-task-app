const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400)
        res.send(e)
    })
})

app.post('/tasks', (req, res) => {
    console.log('hit task endpoint')
    const task = new Task(req.body);
    task.save().then(() => {
        console.log('sucess')
        res.send(task)
    }).catch((e) => {
        console.log('error')
        res.status(400);
        res.send(e)
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})