const multer = require('multer')
const e = require("express");
const fs = require("fs")
const employesmodel = require('./models/employees.model')
var cloudnary = require("cloudinary")
//export.module

cloudnary.config({
    cloud_name: 'db5vn6bj5',
    api_key: '177146712277969',
    api_secret: 'M9EOqm03da0OmGvRLo9hoTwb2Wg'
});


// const store = (data) => {

//     if (!fs.existsSync("users.txt")) {
//         fs.appendFileSync("users.txt", "")
//     }


//     var today = new Date();
//     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date + ' ' + time;

//     data.dateOfregister = dateTime

//     return new Promise(function (resolve, reject) {
//         var string = JSON.stringify(data) + "\n"
//         fs.appendFile("users.txt", string, function (error) {
//             if (error) {
//                 console.log("errorrorororoor")
//                 reject(error)
//             }
//             else {
//                 //now saving in database..
//                 var employeesdata = new employesmodel(data)
//                 employeesdata.save().then(function (result) {
//                     console.log("user is added...", result)
//                     resolve(result)
//                 },function(error)
//                 {
//                     console.log("user is  not added...", error)
//                     resolve(error)
//                 })

//                 // resolve(string)
//             }
//         })
//     })
// }

// const allemployees = function (data) {
//     console.log("...........data", data)
//     return new Promise(function (resolve, reject) {
//         var query = data.query || {}
//         // var projection = { coverid: 1, title: 1 }
//         // CoversModel.find(query, projection).then(function (result) {
//         employesmodel.find(query).then(function (result) {
//             console.log("find employees......", result)
//             resolve(result)
//         }, function (error) {
//             console.log("error find in employees from db", error)
//             reject(error)
//         })
//     })

// }


// const editdetails = function (data) {
   
    
//     var findquery = {
//         employeeid: data.employeeid
//     }
//     var updateQuery = {
//         name: data.name,
//         email: data.email,
//         deparment: data.deparment,
//         image: data.image,
//         role: data.role,
//         employeesaddress: data.employeesaddress,
//         qualification: data.qualification,
//         status: data.status,
//         dateOfJoin: data.dateOfJoin,
//         phone: data.phone
//     }
//     return new Promise(function (resolve, reject) {
//         // let employeesmodel = new employesmodel(data)
//         employesmodel.findOneAndUpdate(findquery, updateQuery, {upsert: false,new :true}).then(function (result) {
//             console.log("updatae data....", result)
//             if(result!=null){
//                 resolve(result)
//             }
//             else{
//                 reject(" something went wrong please check again..")

//             }
            
//         }, function (error) {
//             console.log("some error ")
//             reject(error)
//         })

//     })



   
// }





// const deleteemployees = function (data) {
//     return new Promise(function (resolve, reject) {
//         var query = {
//             employeeid: data.employeeid

//         }
//         employesmodel.remove(query).then(function (result) {
//             console.log("result removing from db", result)
//             // here we manage the if id is not in result in db 
//             resolve(result)
//         }, function (error) {
//             console.log("error removing from db", error)
//             reject(error)
//         })


//     })
// }

// const oneemployees = function (data) {
//     console.log("...........data", data)
//     return new Promise(function (resolve, reject) {

//         employesmodel.findOne(data).then(function (result) {
//             console.log("find employess......", result)
//             resolve(result)
//         }, function (error) {
//             console.log("error find in employees from db", error)
//             reject(error)
//         })
//     })

// }


const upload = function (req, res) {
    //res.send("recevied")
    console.log(".......file stored", req.file.path)

    var pathing = req.file.path
    cloudnary.v2.uploader.upload("C:/Users/Shreya/Desktop/fynd traning/employessProjects_details/" + pathing,
        {
            resource_type: "image",
        }, function (error, result) {
            if (error) {
                console.log(error)
            }
            else {
                console.log(result.url)
                res.send(result.url)
                // mailing(result.url)
            }
        })
}

// const upload = function (req, res) {
//     //res.send("recevied")
//     console.log(".......file stored", req.file.path)

//     var pathing = req.file.path
//     cloudnary.v2.uploader.upload("C:/Users/Shreya/Desktop/fynd traning/employeesProjects_details/" + pathing,
//         {
//             resource_type: "image",
//         }, function (error, result) {
            
//             if (error) {
//                 console.log(error)
//             }
//             else {
//                 console.log(result.url)
//                 res.send(result.url)
//                 // mailing(result.url)
//             }
//         })
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       console.log(".......................chaning",file)
//       cb(null, file.originalname)
//     }
//   })
  
//   exports.uploads = multer({ storage: storage })


module.exports = {
    upload
    
}
//store,
   // allemployees,
   
   // oneemployees,
   // deleteemployees,
  //  editdetails