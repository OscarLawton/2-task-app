const express = require('express')
require('./db/mongoose')
var path = require('path');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const Task = require('./models/task') 
const app = express()
const port = process.env.PORT || 3000

/* app.use((req, res, next) => {
    if(req.method === 'GET'){
        res.send('get no allowed')
    } else {
        next()
    }
}) */


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

/* const jwt = require('jsonwebtoken')
const myFunction = async () => {

    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {expiresIn: '1 hour'});
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data);
}

myFunction()  */