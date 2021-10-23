const projectsmodel=require('../models/projects.model')
const helper=require('../service/helperproject')
const fs=require('fs')
const XLSX = require('xlsx')
//const helper = require('../service/helperemployees')
const excel = require('exceljs');
const path=require('path')
path.join(__dirname,"../indexP.html")

//console.log(path.join(__dirname,"../indexE.html"))
//console.log(__filename)



const projectadding=function(req,res)
{
    helper.store(req.body).then(function(data)
    {
        console.log(req.body)
        res.send(data)

    },function(error)
    {
        console.log("error is..",error)
        res.status(500).send()
    })
}
const downloadingxls =function (req, res) {
    res.download("projects.xlsx")
}
const allprojectseen = function(req,res)
{
    helper.allprojects({query:req.query}).then(function(result)
    {
       // res.json(result)
       res.render("allprojectsdetails",{data:result})
    },function(error)
    {
        res.status(400).send(
            {
                message:"The server could not understand the request due to invalid syntax."+error
            }
        )

    })
    

}
const editprojects = function(req,res)
{
    helper.editproject(req.body).then(function (result) {
        console.log("data updated...", result)
        res.send(result)
    }, function (error) {
        console.log("some error while updation...", error)
       // res.send("error in updated or employee not found")
        res.status(400).send(
            {
                message:"The server could not understand the request due to invalid syntax."+error
            }
        )
    })

}
const deleteprojects = function(req,res)
{
    helper.deleteproject(req.body, res).then(function (result) {
        console.log("data delete...", result)
        res.send("this employees data delete..")

    }, function (error) {
        console.log("some error while deletion...")
       // res.send("error in deletion..", error)
       res.status(400).send(
        {
            message:"The server could not understand the request due to invalid syntax."+error
        }
    )


    })

}

const projectid = function(req,res)
{
    console.log("employees id is......", req.params)
    helper.oneproject(req.params).then(function (result) {
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
const home = function (req, res) {
    res.sendFile(path.join(__dirname,"../indexP.html"))
    convertJsonToExcel()
}
const convertJsonToExcel = () => {




    projectsmodel.find({},(function (err, result) {
        if (err) throw err;
        console.log(result);


        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('projects'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
            { header: 'projectid', key: 'projectid', width: 10 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'details', key: 'details', width: 30 },
            { header: 'deparment', key: 'deparment', width: 10, outlineLevel: 1 }
            , { header: 'department', key: 'department', width: 10 },
            { header: 'technology', key: 'technology', width: 10 },
            { header: 'site', key: 'site', width: 30 }
        ];

        // Add Array Rows
        worksheet.addRows(result);

        // Write to File
        workbook.xlsx.writeFile("projects.xlsx")
            .then(function () {
                console.log("file saved!");
            });

       // db.close();
    }));


}

module.exports={
    projectadding,
    allprojectseen,
    editprojects,
    deleteprojects,
    projectid,
    home,
    downloadingxls
}