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
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 7){
                throw new Error('Password must be greater than 6 characters.')
            }
            if(value === 'password'){
                throw new Error('Password must be something other than: password')
            }
        }
    }
})

/* const me = new User({
    name: "  lake  ", 
    email: "lake@ZSUM.IO",
    age: 22,
    password: '    password    '
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error', error)
}) */

const Task = new mongoose.model('Task', {
    description: { 
        type: String,
        required: true,
        trim: true,
    },
    completed: { 
        type: Boolean,
        default: false,
    }
})

const task = new Task({description: "   clean clothes    "})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
}) 