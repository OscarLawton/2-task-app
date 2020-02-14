require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndUpdate('5e44338dcfb0ab17f0a0d852',{description: "wash car"}).then((task) => {
    
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})