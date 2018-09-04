let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'
let shema = new Schema({
    title:{type : String, required : true }
    description:{type:String}

})
module.exports= mongoose.model(schemaName,schema)