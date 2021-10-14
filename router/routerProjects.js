const express=require('express')
const prouter=express.Router()

const controller=require('../controller/projects')
const helper=require('../helper')

prouter.post("/projectadd",controller.projectadding)
prouter.get("/allprojects",controller.allprojectseen)
prouter.put("/editproject",controller.editprojects)
prouter.delete("/deleteproject",controller.deleteprojects)
prouter.get("/:projectid",controller.projectid)
module.exports=prouter