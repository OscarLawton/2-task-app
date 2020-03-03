const express = require('express');
const User = require('../models/user');
const auth = require('./middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendGoodbyeEmail } = require('../email/account');
const router = new express.Router();

const upload = multer({
    limits: {
        // 1000 is a killobyte, 1000000 is a megabyte
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
       /*  if(!file.originalname.endsWith('.pdf')){
            return cb(new Error('Please upload a PDF'));
        } */
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('Please upload files of type .jpg, png or jpeg'));
        }
        cb(undefined, true);
        /* cb(new Error('File must be a PDF'));
        cb(undefined, true);
        cb(undefined, false); */
    }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);
  
    // Async-Await
    try{
        await user.save();
        sendWelcomeEmail(user.email, user.name)
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
    if(!req.user.avatar){
        const user = req.user;
        res.send( {user} ); 
    }
    else {
        const buff = Buffer.from(req.user.avatar).toString('base64');
        const user = req.user;
        res.render('show', {user, buff}); 
    }
    
   
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
        res.send(user);
    } catch(e){
        res.status(400).send(e);
    }
});

/* router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) =>{
    req.user.avatar = req.file.buffer;
    const user = await req.user.save();
    const buff = Buffer.from(req.user.avatar).toString('base64');
    res.render('show', {user, buff});
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}); */

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) =>{
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    const user = await req.user.save();
    const buff = Buffer.from(req.user.avatar).toString('base64');
    res.render('show', {user, buff});
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch(e){
        res.status(404).send();
    }
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    const user = req.user;
    user.avatar = undefined;
    try{
        const buff = undefined;
        await user.save();
        res.render('show', {user, buff});
    } catch(e){
        console.log(e)
        res.status(400).send()
    }
    
});

router.delete('/users/me', auth,  async (req, res) => {

    try{
      /*   const user = await User.findByIdAndDelete(req.user._id)
        if(!user){
            return res.status(404).send()
        } */
        sendGoodbyeEmail(req.user.email, req.user.name);
        await req.user.remove();
        
        res.send(req.user);
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
});

module.exports = router;