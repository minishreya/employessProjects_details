const projectsmodel=require('../models/projects.model')
const helper=require('../service/helperproject')
const fs=require('fs')

const projectadding=function(req,res)
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

}
const deleteprojects = function(req,res)
{

}

const projectid = function(req,res)
{

}

module.exports={
    projectadding,
    allprojectseen,
    editprojects,
    deleteprojects,
    projectid
}