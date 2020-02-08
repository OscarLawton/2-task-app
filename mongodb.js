// CRUD - Create Read Update Delete


/* const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID */

// Destructured syntax
const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()
console.log(id.getTimestamp())
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = '2-task-app-tryout'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err){
        return console.log('Unable to connnect to database')
    }
    const db = client.db(databaseName)
    // Insert one 
   /*  db.collection('users').insertOne({
        _id: id,
        name: "Buloo",
        age: 27
    }, (error, result) => {
        if (error){
            return console.log('Unagle to insert user')
        }
        console.log(result.ops)
    })  */

    // Insert Two
    /* db.collection('users').insertMany([
        {name: "Jen", age: 23},{name: "Frank", age: 24}
    ],(error, result) => {
        if (error){
            return console.log("unable to insert documents")
        }
        console.log(result.ops)
    }) */

    // Exercise
    /* db.collection('tasks').insertMany([
        {
            description: "wash dishes",
            completed: false
        },
        {
            description: "Clean clothes",
            completed: false
        },
        {
            description: "take out trash",
            completed: false
        }
    ],(error, result) => {
        if(error){
            return console.log(error)
        }
        console.log(result.ops)
    }) */
})


