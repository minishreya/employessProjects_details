const express=require('express')
const prouter=express.Router()

const controller=require('../controller/projects')
const helper=require('../helper')
const auth=require('../auth.service')

prouter.get('/',controller.home)
prouter.post("/projectadd",auth.authenticateAdmin,controller.projectadding)
prouter.get("/allprojects",controller.allprojectseen)
prouter.put("/editproject",auth.authenticateAdmin,controller.editprojects)
prouter.delete("/deleteproject",auth.authenticateAdmin,controller.deleteprojects)
prouter.get("/:projectid",controller.projectid)
module.exports=prouter