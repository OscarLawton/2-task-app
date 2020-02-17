const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
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

router.get('/tasks', async (req, res) => {
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

router.get('/tasks/:id', async (req, res) =>{
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

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)  
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({'error': "invalid updates!"})
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            
            res.status(404).send()
        }
        res.send(task)
        
    } catch(e){
        console.log(e)
        res.status(400).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {

    try{
        await Task.findByIdAndDelete(req.params.id)
        console.log("task deleted!")
        res.send("deleted!")
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router