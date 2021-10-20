const express=require('express')
const prouter=express.Router()

const controller=require('../controller/employeesProject')
const helper=require('../helper')
const auth = require('../auth.service')

prouter.post("/petadd",auth.authenticateAdmin,controller.petadding)
prouter.get("/allpet",controller.allpetseen)
prouter.put("/editpet",auth.authenticateAdmin,controller.editpet)
prouter.delete("/deletepet",auth.authenticateAdmin,controller.deletepet)
//prouter.get("/:projectid",controller.projectid)
module.exports=prouter