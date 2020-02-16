require('../src/db/mongoose')
const Task = require('../src/models/task')

/* Task.findByIdAndDelete("5e44336091e40817c3e83992").then((task) => {
    
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
 */
const deleteTask = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    console.log(task)
    return count
}

deleteTask("5e4432aa171a8b1780200dd4").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})