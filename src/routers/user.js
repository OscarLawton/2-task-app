const express = require('express');
const User = require('../models/user');
const auth = require('./middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body)
  
    // Async-Await
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
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

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()

        res.send({user, token});
    } catch(e){
        console.log('4')
        res.status(400).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
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

router.patch('/users/:id', async (req, res) => {
    console.log('1')
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every((update) => {
        console.log('2')
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        console.log('3')
        return res.status(400).send({'error': "invalid updates!"})
    }
    try{
        console.log('4')
        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            console.log('5')
            user[update] = req.body[update]
        })
        console.log('6')
        await user.save()
        console.log('7') 
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!user){
            console.log('8')
            return res.status(404).send()
        } 
        console.log('9')
        res.send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {

    try{
        await User.findByIdAndDelete(req.params.id)
        console.log("user deleted!")
        res.send("deleted!")
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
});

module.exports = router;