const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = '2-task-app-tryout'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err){
        return console.log('Unable to connnect to database')
    }
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        name: "Andrew",
        age: 27
    })
})


