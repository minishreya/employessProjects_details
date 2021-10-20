//const projectsmodel=require('../models/task.model')
const helper=require('../service/helpertask')
const fs=require('fs')

const taskadding=function(req,res)
{
    helper.store(req.body).then(function(data)
    {
        res.send(data)

    },function(error)
    {
        console.log("error is..",error)
        res.status(500).send()
    })
}
const alltaskseen = function(req,res)
{
    helper.alltask({query:req.query}).then(function(result)
    {
        res.json(result)
    },function(error)
    {

    })
    

}
const edittask = function(req,res)
{
    helper.edittask(req.body, res).then(function (result) {
        console.log("data updated...", result)
        res.send(result)
    }, function (error) {
        console.log("some error while updation...", error)
        res.send("error in updated or employee not found")
    })

}
const deletetask = function(req,res)
{
    helper.deletetask(req.body, res).then(function (result) {
        console.log("data delete...", result)
        res.send("this employees data delete..")

    }, function (error) {
        console.log("some error while deletion...")
        res.send("error in deletion..", error)
    })

}

const taskid = function(req,res)
{
    console.log("employees id is......", req.params)
    helper.onetask(req.params).then(function (result) {
        res.json(result)
       // res.render("Oneemployeesdetails", { data: result })

    }, function (error) {

    })

}

module.exports={
    taskadding,
    alltaskseen,
    edittask,
    deletetask,
    taskid
}