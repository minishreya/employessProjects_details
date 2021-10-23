const projectsmodel=require('../models/pet.model')
const helper=require('../service/helperpet')
const fs=require('fs')



const petadding=function(req,res)
{
    helper.store(req.body).then(function(data)
    {
        console.log(req.body)
        res.send(data)

    },function(error)
    {
        console.log("error is..",error)
        res.status(400).send(
            {
                message:"The server could not understand the request due to invalid syntax."+error
            }
        )
    })
}
const allpetseen = function(req,res)
{
    helper.allpet({query:req.query}).then(function(result)
    {
        res.json(result)
    },function(error)
    {
        res.status(400).send(
            {
                message:"The server could not understand the request due to invalid syntax."+error
            }
        )
    })
    

}
const editpet = function(req,res)
{
    helper.editpet(req.body, res).then(function (result) {
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
const deletepet = function(req,res)
{
    helper.deletepet(req.body, res).then(function (result) {
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


// const projectid = function(req,res)
// {
//     console.log("employees id is......", req.params)
//     helper.oneproject(req.params).then(function (result) {
//         res.render("Oneemployeesdetails", { data: result })

//     }, function (error) {

//     })

// }

module.exports={
    petadding,
    allpetseen,
    editpet,
    deletepet
   // projectid
}