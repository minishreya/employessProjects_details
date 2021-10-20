const express=require('express')
const loginrouter=express.Router()

const controller =require("../controller/emplyees.workhour")

loginrouter.post("/mylogin",controller.employeelogin)
loginrouter.get("/mylogout",controller.employeelogout)
//loginrouter.post("/workhour/allemployees",controller.employeesworkhour)

module.exports=loginrouter