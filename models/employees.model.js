const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const employeesSchema = new Schema({
    employeeid:{type:Number,unique:true,require:true}, // user define
    name:{type:String,require:true},
    email:{type:String , unique:true , required:true},
    deparment:{type:String,required:true},
    image:{type:String},
    role:{type:String , default:"fresher 0 year"},
    employeesaddress:{type:String},
    qualification:{type:String},
    status:{type:String,default:"full time"},
    dateOfJoin:{type:Date , default : new Date()},
    phone:{type:Number}

})
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
employeesSchema.path( 'email' ).validate(
    email => emailRegex.test( email ),
    'Invalid email id format'
);

const emodel = Mongoose.model("users",employeesSchema)

module.exports =  emodel


