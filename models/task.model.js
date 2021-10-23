const Mongoose=require('mongoose')
const Schema = Mongoose.Schema

const projectsSchema=new Schema({
    taskid:{type:Number,require:true},
    employeeids: {
        type: [ Mongoose.Schema.Types.ObjectId ],
        ref: 'users',
       default:[],
       require:true
    },
    projectids:{type: [ Mongoose.Schema.Types.ObjectId ],
        ref: 'project',
        default:[],
        require:true

},
    name:{type:String, require:true},
    taskdetails:{type:String,reuire:true},
    taskProgress:{type:Number,require:true}
})
const tmodel=Mongoose.model("task",projectsSchema)
module.exports=tmodel