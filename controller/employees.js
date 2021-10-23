//const express = require('express')
const fs = require('fs')
const path=require('path')
//const bodyparser = require('body-parser')
const multer = require('multer')
const XLSX = require('xlsx')
const helper = require('../service/helperemployees')
//const Mongoose = require('mongoose')
const excel = require('exceljs');
//const dburl = "mongodb://localhost:27017/companyemployees"
//const dburl = "mongodb+srv://fynd:fynd@cluster0.hzt65.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const employeesmodel = require('../models/employees.model')
//............
//const url = "mongodb://localhost:27017/";
//...........

//link is  on heroku----->
//https://employeesbymini.herokuapp.com/allemployes


path.join(__dirname,"../index.html")
console.log(path.join(__dirname,"../indexE.html"))
console.log(__filename)


const home = function (req, res) {
    res.sendFile(path.join(__dirname,"../indexE.html"))
    convertJsonToExcel()
}

const downloadingxls =function (req, res) {
    res.download("employees.xlsx")
}

const empoyessadding =function (req, res) {
    helper.store(req.body).then(function (data) {

        res.send(data)
    }, function (error) {
        // res.send={
        //     message:"duplicate employees id not be admitted"
        // }
        console.log("error is...",error)
        res.status(400).send(
            {
                message:"The server could not understand the request due to invalid syntax."+error
            }
        )
    })

}

const allemployeesseen = function (req, res) {
    console.log("///////////////////",req.body)
    helper.allemployees({ query: req.query }).then(function (result) {
        res.render("allemployeesdetails", { data: result })

    }, function (error) {
        console.log("error is...",error)
        res.status(400).send(
            {
                message:"The server could not understand the request due to invalid syntax."+error
            }
        ) 
    })

}

const editemployees = function (req, res) {
    helper.editdetails(req.body, res).then(function (result) {
        console.log("data updated...", result)
        res.send(result)
    }, function (error) {
        console.log("some error while updation...", error)
        console.log("error is...",error)
        res.status(400).send(
            {
                message:"The server could not understand the request due to invalid syntax."+error
            }
        )
        
       // res.send("error in updated or employee not found")
    })
}

const deleteemployees = function (req, res) {
    helper.deleteemployees(req.body, res).then(function (result) {
        console.log("data delete...", result)
        res.send("this employees data delete..")

    }, function (error) {
        console.log("some error while deletion...")
       // res.send("error in deletion..", error)
        console.log("error is...",error)
        res.status(400).send(
            {
                message:"The server could not understand the request due to invalid syntax."+error
            }
        )
    })
}

const employeesid = function (req, res) {
    console.log("employees id is......", req.params)
    helper.oneemployees(req.params).then(function (result) {
       // res.render("Oneemployeesdetails", { data: result })
       res.json(result)

    }, function (error) {
        res.status(400).send(
            {
                message:"The server could not understand the request due to invalid syntax."+error
            }
        )
    })
}


const convertJsonToExcel = () => {




    employeesmodel.find({},(function (err, result) {
        if (err) throw err;
        console.log(result);


        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('employees'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
            { header: 'employeeid', key: 'employeeid', width: 10 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'email', key: 'email', width: 30 },
            { header: 'deparment', key: 'deparment', width: 10, outlineLevel: 1 }
            , { header: 'image', key: 'image', width: 10 },
            { header: 'role', key: 'role', width: 10 },
            { header: 'employeesaddress', key: 'employeesaddress', width: 30 },
            { header: 'qualification', key: 'qualification', width: 30 },
            { header: 'status', key: 'status', width: 10 },
            { header: 'dateOfJoin', key: 'dateOfJoin', width: 30 },
            { header: 'phone', key: 'phone', width: 30 }

        ];

        // Add Array Rows
        worksheet.addRows(result);

        // Write to File
        workbook.xlsx.writeFile("employees.xlsx")
            .then(function () {
                console.log("file saved!");
            });

       // db.close();
    }));


}





//changing the name



//servers.post("/upload", uploads.single('file'), helper.upload)
// const uploadSingleImage = function(req,res)
// {
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, 'uploads')
//         },
//         filename: function (req, file, cb) {
//             console.log(".......................chaning", file)
//             cb(null, file.originalname)
//         }
//     })
    
//     const uploads = multer({ storage: storage })

// }


module.exports={
    home,downloadingxls,
    empoyessadding,allemployeesseen
    ,editemployees, deleteemployees
    , employeesid
}