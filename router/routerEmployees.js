const express=require('express')
const erouter=express.Router()

const controller=require('../controller/employees')
const helper=require('../helper')

erouter.get('/',controller.home)
erouter.get('/download',controller.downloadingxls)
erouter.post("/employesadd",controller.empoyessadding)
erouter.get("/allemployes",controller.allemployeesseen)
erouter.put("/editemployees",controller.editemployees)
erouter.delete("/deleteemployees",controller.deleteemployees)
erouter.get("/:employeeid",controller.employeesid)


//erouter.post("/upload",controller.uploading)



module.exports=erouter