const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    // Async-Await
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
    // Promise
   /*  user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400)
        res.send(e)
    }) */
})

app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send()
    }
    /* User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
        res.send(e)
    }) */
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
   /*  User.findById({_id: id}).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    }) */
})

app.patch('/users/:id', async (req, res) => {
    const udpates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = update.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({'error': "invalid updates!"})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!user){
            return res.status(404).send()
        } 
        res.send(user)
    } catch(e){
        res.status(400).send()
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try{
        await task.save()
        res.send(task)
    } catch(e){
        res.status(500).send()
        console.log(e)
    }
    
    /* const task = new Task(req.body);
    task.save().then(() => {
        console.log('sucess')
        res.send(task)
    }).catch((e) => {
        console.log('error')
        res.status(400);
        res.send(e)
    }) */
})

app.get('/tasks', async (req, res) => {
    try{
        tasks = await Task.find({})
        res.send(tasks)
    } catch(e){
        res.status(500).send()
        console.log(e)
    }
   /*  Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send(e)
    }) */
})

app.get('/tasks/:id', async (req, res) =>{
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        res.send(task)
    } catch (e){
        res.status(500).send(e)
    }
  /*   Task.findById(_id).then((task) => {
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send(e)
    }) */
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})