const Mongoose=require('mongoose')
const Schema = Mongoose.Schema

const projectsSchema=new Schema({
    petid:{type:Number,require:true},
    taskid:{type: [ Mongoose.Schema.Types.ObjectId ],
        ref: 'task',
        default:[],require:true},
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
    petname:{type:String, require:true},
    petdetails:{type:String,reuire:true}
})
const petmodel=Mongoose.model("pet",projectsSchema)
module.exports=petmodel