let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'
let shema = new Schema({
    title:{type : String, required : true },
    boardId : { type : ObjectId , ref:'Board' , required : true},
    created: { type: Number, required: true, default: Date.now() },

})
module.exports= mongoose.model(schemaName,schema)