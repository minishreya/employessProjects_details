const express=require('express')
const erouter=express.Router()

const controller=require('../controller/employees')
const helper=require('../helper')
const auth=require("../auth.service")

erouter.get('/',controller.home)
erouter.post("/employesadd",auth.authenticateAdmin,controller.empoyessadding) 
//erouter.post("/employesadd",controller.empoyessadding) 
erouter.get("/allemployes",controller.allemployeesseen)
erouter.put("/editemployees",auth.authenticateEmployee,controller.editemployees)
erouter.delete("/deleteemployees",auth.authenticateAdmin,controller.deleteemployees)
erouter.get("/:employeeid",controller.employeesid)


//erouter.post("/upload",controller.uploading)



module.exports=erouter