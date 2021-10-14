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
const dburl = "mongodb://localhost:27017/companyemployees"
//const dburl = "mongodb+srv://fynd:fynd@cluster0.hzt65.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const employeesmodel = require('./models/employees.model')
const routeremployees=require('./router/routerEmployees')
const routerprojects=require('./router/routerProjects')
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

servers.use(routerprojects)
servers.use(routeremployees)
//servers.use(routerprojects)

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



Mongoose.connect(dburl).then(function () {
    console.log("Connetcted to database")
    servers.listen(Port, function () {
        console.log("server is listning ....", Port)
    })
}, function (error) {
    console.log(error)
})
//................................