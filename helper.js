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