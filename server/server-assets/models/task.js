let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'
let comment = new Schema({
    description: {type:String,required:true}
    
})

let schema = new Schema({
    title: {type : String , required : true},
    listId:{type : ObjectId, ref:"list",required: true},
    created: {type:String, required:true,default:Date.now()},
    author:{type:ObjectId, ref:'User',required: true,},
    comments:[comment]
})
// schema.pre('save',function(next){
//     this.markModified('commments')
//     next()
// })
module.exports= mongoose.model(schemaName,schema)