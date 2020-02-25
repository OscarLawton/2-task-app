const express = require('express')
require('./db/mongoose')
var path = require('path');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000

const multer = require('multer');
const upload = multer({
    dest: 'images'
})
app.post('/upload', upload.single('upload'), (req, res) =>{
    res.send();
})



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use('/', async (req, res) =>{
    try{
        const tasks = await Task.find({})
        res.render('index', {tasks});
       
    } catch(e){
        res.status(500).send()
    }
    
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

/* const Task = require('./models/task');
const User = require('./models/user');
const main = async () => {
    const task = await Task.findById('5e5150e44ff3b40edb694535')
    await task.populate('owner').execPopulate();
    
    console.log(task.owner )
    const user = await User.findById('5e514d6dc81b430dd99dbeeb');
    await user.populate('tasks').execPopulate();
    
}

main() */