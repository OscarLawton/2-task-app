const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

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