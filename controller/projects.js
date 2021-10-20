const projectsmodel=require('../models/projects.model')
const helper=require('../service/helperproject')
const fs=require('fs')

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
const allprojectseen = function(req,res)
{
    helper.allprojects({query:req.query}).then(function(result)
    {
        res.json(result)
    },function(error)
    {

    })
    

}
const editprojects = function(req,res)
{
    helper.editproject(req.body).then(function (result) {
        console.log("data updated...", result)
        res.send(result)
    }, function (error) {
        console.log("some error while updation...", error)
        res.send("error in updated or employee not found")
    })

}
const deleteprojects = function(req,res)
{
    helper.deleteproject(req.body, res).then(function (result) {
        console.log("data delete...", result)
        res.send("this employees data delete..")

    }, function (error) {
        console.log("some error while deletion...")
        res.send("error in deletion..", error)
    })

}

const projectid = function(req,res)
{
    console.log("employees id is......", req.params)
    helper.oneproject(req.params).then(function (result) {
       // res.render("Oneemployeesdetails", { data: result })
       res.json(result)

    }, function (error) {

    })

}

module.exports={
    projectadding,
    allprojectseen,
    editprojects,
    deleteprojects,
    projectid
}