const Mongoose=require('mongoose')
const Schema = Mongoose.Schema

const projectsSchema=new Schema({
    projectid:{type:Number,unique:true,require:true},
    name:{type:String, require:true},
    details:{type:String,reuire:true},
    department:{type:String,require:true},
    technology:{type:String},
    site:{type:String}
})
const pmodel=Mongoose.model("project",projectsSchema)
module.exports=pmodel

// employeeIds: {
    //     type: [ Mongoose.Schema.Types.ObjectId ],
    //     ref: 'users',
    //     default: [] // set to an empty array if topicIds is not passed
    // },