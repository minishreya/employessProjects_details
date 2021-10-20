const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const employeesSchema = new Schema({
    employeeid:{type:Number,unique:true,require:true},
    name:{type:String,require:true},
    password:{type:String,require:true},
    email:{type:String , unique:true , required:true},
    loginrole:{type:String , default:"employee"},
    workhour:{type:Number,default:00},
    logindate:{type:Date , default : new Date()},
    logoutdate:{type:Date , default : new Date()},
    etoken:{type:String,default:"demo"}
})

const emodel = Mongoose.model("Elogin",employeesSchema)

module.exports =  emodel


