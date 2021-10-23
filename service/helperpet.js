const fs = require("fs")
const petmodel=require('../models/pet.model')
const store = (data)=>
{
return new Promise(function(resolve,reject)
{
    
        var petdata=new petmodel(data)
        petdata.save().then(function(result)
        {
            console.log("data is added projects")
            resolve(result)
        },function(error)
        {
            petdata.remove({petid:data.petid}).then(function()
            {
                console.log("not added project",error)
                reject(error)
            })
            
        })
    

})}


const allpet = function (data) {
    console.log("...........data", data)
    return new Promise(function (resolve, reject) {
        var query = data.query || {}
        // var projection = { coverid: 1, title: 1 }
        // CoversModel.find(query, projection).then(function (result) {
           // projectmodel.find(query).populate( {path:'employeeIds',select: 'name'} ).then(function (result) {
                petmodel.find(query).populate( {path:'employeeids',select: 'name'} ).populate({path:'projectids'}).populate({path:'taskid'}).then(function (result) {
            console.log("find employees......", result)
            resolve(result)
        }, function (error) {
            console.log("error find in employees from db", error)
            reject(error)
        })
    })

}

const editpet= function(data)
{
    var findquery={
        petid:data.petid
    }
    var updateQuery={
        taskid:data.taskid,
        employeeids:data.employeeids,
        projectids:data.projectids,
        petname:data.petname,
        petdetails:data.petdetails

    }

    return new Promise(function(resolve,reject)
    {
        petmodel.findOneAndUpdate(findquery,updateQuery,{upsert: false,new :true}).then(function (result){
        console.log("update data...",result)
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

const deletepet= function(data)
{
    return new Promise(function(resolve,reject)
    {
        var query={
            petid:data.petid
        }

        petmodel.remove(query).then(function(result){
            console.log("result removing from db",result)
            resolve(result)
        },function(error)
        {
            console.log("error removing from db",error)
            reject(error)
        })
    }
    )
}

// const oneproject= function(data)
// {
//     console.log("...........data", data)
//     return new Promise(function (resolve, reject) {

//         projectmodel.findOne(data).then(function (result) {
//             console.log("find employess......", result)
//             resolve(result)
//         }, function (error) {
//             console.log("error find in employees from db", error)
//             reject(error)
//         })
//     })
// }



// },function(error)
// {
//     console.log("error is ",error)
// })


module.exports={
    store,
    allpet,
    editpet,
    deletepet
   // oneproject

}