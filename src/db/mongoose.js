const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
       
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a postive number')
            }
        }
    }
})

const me = new User({
    name: "  Greg  ", 
    email: "greg@ZSUM.IO" 
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error', error)
})

/* const Task = new mongoose.model('Task', {
    description: { type: String},
    completed: { type: Boolean}
})

const task = new Task({description: "wash dishes", completed: false})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
}) */