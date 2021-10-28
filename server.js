const express = require('express')
let servers = express()
const fs = require('fs')
const bodyparser = require('body-parser')
const multer = require('multer')
const XLSX = require('xlsx')
const helper = require('./helper')
const Port = process.env.PORT || 8000
const Mongoose = require('mongoose')
const excel = require('exceljs');
//const dburl = "mongodb://localhost:27017/companyemployees"
//const dburl="mongodb+srv://fyndEPC:fyndEPC@cluster0.94okp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const dburl = "mongodb+srv://fynd:fynd@cluster0.hzt65.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const dburl="mongodb+srv://fyndEPC:fyndEPC@cluster0.94okp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const employeesmodel = require('./models/employees.model')
const routeremployees=require('./router/routerEmployees')
const routerprojects=require('./router/routerProjects')
const routertask=require('./router/routerTask')
const routerworklogin=require('./router/routerEmployeesworkHour.js')
const routerpet=require('./router/routerPEconnect')
const controllerE=require('./controller/employees')
const controllerP=require('./controller/projects')
const logger=require('./middleware/logger')

//............
//const url = "mongodb://localhost:27017/";
//...........

//link is  on heroku----->
//https://employeesbymini.herokuapp.com/allemployes



servers.use(bodyparser.json())
servers.set('view engine', "ejs")
// middleware 1
servers.use(logger);
servers.use("/t",routertask)
servers.use("/e",routeremployees)
servers.use("/p",routerprojects)
servers.use("/auth",routerworklogin)
servers.use("/pet",routerpet)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log(".......................chaning", file)
        cb(null, file.originalname)
    }
})

const uploads = multer({ storage: storage })

servers.post("/upload", uploads.single('file'), helper.upload)
servers.get('/downloadEmployees',controllerE.downloadingxls) // here we are calling the e/download but index mey /download bhula rahe h...
servers.get('/downloadProjects',controllerP.downloadingxls) // here we are calling the e/download but index mey /download bhula rahe h...
servers.get('/',function(req,res)
{
    res.sendFile(__dirname + "/index.html")
})



Mongoose.connect(dburl).then(function () {
    console.log("Connetcted to database")
    servers.listen(Port, function () {
        console.log("server is listning ....", Port)
    })
}, function (error) {
    console.log(error)
})
//................................
