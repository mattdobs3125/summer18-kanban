let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'


let schema = new Schema({
    title: {type : String , required : true},
    listId:{type : ObjectId, required: true},
    created: {type:String, required:true,default:Date.now()},
    // description: {type:String,required:true}
})

module.exports= mongoose.model(schemaName,schema)