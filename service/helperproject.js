const fs = require("fs")
const projectmodel=require('../models/projects.model')
const store = (data)=>
{
return new Promise(function(resolve,reject)
{
    
        var projectsdata=new projectmodel(data)
        projectsdata.save().then(function(result)
        {
            console.log(result)
            resolve(result)
        },function(error)
        {
            projectsdata.remove({projectid:data.projectid})
            console.log("not added project",error)
            reject(error)
        })
    

})}


const allprojects = function (data) {
    console.log("...........data", data)
    return new Promise(function (resolve, reject) {
        var query = data.query || {}
        // var projection = { coverid: 1, title: 1 }
        // CoversModel.find(query, projection).then(function (result) {
           // projectmodel.find(query).populate( {path:'employeeIds',select: 'name'} ).then(function (result) {
                projectmodel.find(query).then(function (result) {
            console.log("find employees......", result)
            resolve(result)
        }, function (error) {
            console.log("error find in employees from db", error)
            reject(error)
        })
    })

}

const editproject= function(data)
{
    var findquery={
        projectid:data.projectid
    }
    var updateQuery={
        projectid:data.projectid,
        name:data.name,
        details:data.details,
        department:data.department,
        technology:data.technology,
        site:data.site

    }

    return new Promise(function(resolve,reject)
    {
        projectmodel.findOneAndUpdate(findquery,updateQuery,{upsert: false,new :true}).then(function (result){        console.log("update data...",result)
        if(result!=null)
        {
            resolve(result)
        }
        else
        {
            reject("something went wrong..")
        }
        },function(error)
    {
        console.log("some error")
        reject(error)
    })
})
}
    

const deleteproject= function(data)
{
    return new Promise(function(resolve,reject)
    {
        var query={
            projectid:data.projectid
        }

        projectmodel.remove(query).then(function(result){
            console.log("result removing from db",result)
            resolve(result)
        },function(error)
        {
            console.log("error removing from db",error)
            reject(error)
        })
    })
}

const oneproject= function(data)
{
    console.log("...........data", data)
    return new Promise(function (resolve, reject) {

        projectmodel.findOne(data).then(function (result) {
            console.log("find employess......", result)
            resolve(result)
        }, function (error) {
            console.log("error find in employees from db", error)
            reject(error)
        })
    })
}



// },function(error)
// {
//     console.log("error is ",error)
// })


module.exports={
    store,
    allprojects,
    editproject,
    deleteproject,
    oneproject

}