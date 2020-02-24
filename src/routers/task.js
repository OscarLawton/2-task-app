const express = require('express')
const Task = require('../models/task')
const auth = require('./middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

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


/* // GET /tasks?completed=false
// Get tasks?limit=2&skip=20
// My soloution
router.get('/tasks', auth, async (req, res) => {
    const owner = req.user._id;
    const completed = req.query.completed;
    const limit= req.query.limit;
    var skip = req.query.skip;
    var tasksLimited = [];
    try{
       console.log(skip)
        if(!completed){
            tasks = await Task.find({owner})
           
        }
      
        else if(completed == 'true' || completed == 'false'){
            tasks = await Task.find({owner, completed})
        
        }
        if(!tasks){
            res.status(404).send();
        }
        if(!skip){
            skip = 0
        }
        for(var i = 0; i < limit; i++){
            tasksLimited.push(tasks[i+(skip-1)]);
        }
        console.log(tasksLimited)
        tasksLimited = tasksLimited.filter(function (el) {
            return el != null;
          });
        res.send(tasksLimited);
       
    } catch(e){
        res.status(500).send()
        console.log(e)
    }
})
 */

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// Get /tasks?sortBy=createdAt:desc
// Tutorial's soloution
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {};
    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === 'desc' ?  -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
});

router.get('/tasks/:id', auth, async (req, res) =>{
    const _id = req.params.id;
    try{
        //const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
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

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)  
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({'error': "invalid updates!"})
    }
    try{
        const owner = req.user._id;
        const task = await Task.findOne({_id: req.params.id, owner});
       
        updates.forEach((update) => {
           task[update] = req.body[update];
        })
        await task.save();
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            
            res.status(404).send()
        }
        res.send(task)
        
    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {

    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
     
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router