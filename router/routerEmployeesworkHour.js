const express=require('express')
const loginrouter=express.Router()

const controller =require("../controller/emplyees.workhour")

loginrouter.post("/mylogin",controller.employeelogin)
loginrouter.post("/mylogout",controller.employeelogout)
loginrouter.get("/workhour/allemployees",controller.employeesworkhour)

module.exports=loginrouter