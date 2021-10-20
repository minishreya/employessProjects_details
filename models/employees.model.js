const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const employeesSchema = new Schema({
    employeeid:{type:Number,unique:true,require:true}, // user define
    name:{type:String,require:true},
    email:{type:String , unique:true , required:true},
    deparment:{type:String,required:true},
    image:{type:String},
    role:{type:String , default:"fresher"},
    employeesaddress:{type:String},
    qualification:{type:String},
    status:{type:String,default:"full time"},
    dateOfJoin:{type:Date , default : new Date()},
    phone:{type:Number}

})

const emodel = Mongoose.model("users",employeesSchema)

module.exports =  emodel


