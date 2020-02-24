const express = require('express');
const User = require('../models/user');
const auth = require('./middleware/auth');
const multer = require('multer');
const router = new express.Router();

const upload = multer({
    dest: 'avatars'
});
router.post('/users', async (req, res) => {
    const user = new User(req.body);
  
    // Async-Await
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e){
        res.status(400).send(e);
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
        const token = await user.generateAuthToken();
        
        res.send( { user, token });
    } catch(e){
        
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    console.log(req.user.tokens)
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    console.log('did this run 222')
    try{
        console.log(req.user.tokens)
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e){
        console.log(e)
        res.status(500).send(e)
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

router.patch('/users/me', auth, async (req, res) => {
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
        console.log(req.user._id);
    
        const user = req.user;
        updates.forEach((update) => {
            
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
        res.status(400).send(e);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), (req, res) =>{
    res.send("success!!!");
});

router.delete('/users/me', auth,  async (req, res) => {

    try{
      /*   const user = await User.findByIdAndDelete(req.user._id)
        if(!user){
            return res.status(404).send()
        } */
        await req.user.remove()
        res.send(req.user)
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
});

module.exports = router;