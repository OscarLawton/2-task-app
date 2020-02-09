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
    // Create
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

    // Read)
    // Find One
  /*   db.collection('users').findOne({ _id: new ObjectID("5e3df913a06aa40777b3e138") }, (err, user) => {
        if(err){
            return console.log('unable to fetch')
        }

        console.log(user)
    }) */
    
    // Find multiple documents
  /*   db.collection('users').find({ age: 27 }).toArray((error, users) => {
        console.log(users)
    })
    db.collection('users').find({ age: 27 }).count((error, count) => {
        console.log(count)
    }) */


    // Chalenge 
   /*  db.collection('tasks').findOne({ _id: new ObjectID("5e3ea516e1737a06db68a179") }, (error, task) => {
        if(error){
            return console.log(error)
        }

        console.log(task)
    })

    db.collection('tasks').find({completed: false}, (err, tasks) => {
        if(err){
            return console.log(err)
        }

        console.log(tasks)
    }) */

    // Update
    // Update One
   /*  db.collection('users').updateOne({
        _id: new ObjectID("5e3df913a06aa40777b3e138")
    }, {
         $inc: {
            age: 1
         }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */

    // Update Many
   /*  db.collection('users').updateMany({
        age: 28
    }, {
        $mul: {
            age: 0.5
        }
    }).then((result) =>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */
    // Update Challenge
    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})


