var mongoose = require('mongoose')
var connectionString = 'mongodb://student:student1@ds020208.mlab.com:20208/kanban-project'
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})