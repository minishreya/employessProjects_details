const fs = require("fs")
const taskmodel=require('../models/task.model')
const store = (data)=>
{
return new Promise(function(resolve,reject)
{
    
        var taskdata=new taskmodel(data)
        taskdata.save().then(function(result)
        {
            console.log("data is added task")
            resolve(result)
        },function(error)
        {
            taskdata.remove({taskid:data.taskid})
            console.log("not added task",error)
            reject(error)
        })
    

})}


const alltask = function (data) {
    console.log("...........data", data)
    return new Promise(function (resolve, reject) {
        var query = data.query || {}
            taskmodel.find(query).populate( {path:'employeeids',select: 'name'} ).then(function (result) {
            console.log("find employees......", result)
            resolve(result)
        }, function (error) {
            console.log("error find in employees from db", error)
            reject(error)
        })
    })

}

const edittask= function(data)
{
    var findquery={
        taskid:data.taskid 
    }
    var updateQuery={
        employeeids:data.employeeids,
        name:data.name,
        taskdetails:data.taskdetails,
        taskProgress:data.taskProgress

    }

    return new Promise(function(resolve,reject)
    {
        taskmodel.findOneAndUpdate(findquery,updateQuery,{upsert: false,new :true}).then(function (result){
        console.log("update data...",result)
        if(result!=null)
        {
            resolve(result)
        }
        else
        {
            reject("something went wrong.. upadte in TASK")
        }
    },function(error)
    {
        console.log("some error in task updation ")
        reject(error)
    })
})
}

const deletetask= function(data)
{
    return new Promise(function(resolve,reject)
    {
        var query={
            taskid:data.taskid
        }

        taskmodel.remove(query).then(function(result){
            console.log("result removing from db",result)
            resolve(result)
        },function(error)
        {
            console.log("error removing from db",error)
            reject(error)
        })
    })
}

const onetask= function(data)
{
    console.log("ONE TASK...........data", data)
    return new Promise(function (resolve, reject) {

       // taskmodel.findOne(data).then(function (result) {
        //taskmodel.findOne(data).populate( {path:'employeeids',select: 'name'} ).populate({path:'projectids'}).then(function (result) {
            taskmodel.findOne(data).populate( {path:'employeeids'}).then(function (result) {
            console.log("find one task......", result)
            resolve(result)
        }, function (error) {
            console.log("error find in task from db", error)
            reject(error)
        })
    })
}






module.exports={
    store,
    alltask,
    edittask,
    deletetask,
    onetask

}