const express=require('express')
const prouter=express.Router()

const controller=require('../controller/task')
const helper=require('../helper')
const auth=require('../auth.service')

prouter.post("/taskadd",auth.authenticateAdmin,controller.taskadding)
prouter.get("/alltask",controller.alltaskseen)
prouter.put("/edittask",controller.edittask)
//prouter.put("/edittask",auth.authenticateEmployee,controller.edittask)
prouter.delete("/deletetask",auth.authenticateAdmin,controller.deletetask)
prouter.get("/:taskid",controller.taskid)
module.exports=prouter