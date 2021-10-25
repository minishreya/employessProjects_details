const fs = require("fs")
const employesmodel = require('../models/employees.model')
const loginmodel=require("../models/employees.login.model")
const mailer=require("../mail.service")
const store = function(data)  {

    if (!fs.existsSync("users.txt")) {
        fs.appendFileSync("users.txt", "")
    }


    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    data.dateOfregister = dateTime

    return new Promise(function (resolve, reject) {
        var string = JSON.stringify(data) + "\n"
        fs.appendFile("users.txt", string, function (error) {
            if (error) {
                console.log("conroller while appending file error",error)
                reject(error)
            }
            else {
                //now saving in database..
                var employeesdata = new employesmodel(data)
                var eloginmodel=new loginmodel(data)
                employeesdata.save().then(function (result) {
                    eloginmodel.save().then(function(result){
                        var emailsdetails=mailer.setBody(data.email,data.employeeid)
                        console.log("emails details are...",emailsdetails)
                        mailer.sendMail(emailsdetails).then(function(result)
                        {
                            console.log("user is added...", result)
                            resolve("data added db and mail send")
                        },function(error)
                        {
                            employeesdata.remove({employeeid:data.employeeid}).then(function(){
                                eloginmodel.remove({employeeid:data.employeeid})
                                console.log("By sending mail not work error..",error)
                                reject("Check your emailId is not valid or some data is misssing")
                            })
                            
                        })
                       
                    },function(error)
                    {
                      console.log("login data save error.....",error) 
                            reject(error)
                    })
                    
                },function(error)
                {
                    console.log("user is  not added...", error)
                    reject(error)
                })

                // resolve(string)
            }
        })
    })
}

const allemployees = function (data) {
    console.log("...........data", data)
    return new Promise(function (resolve, reject) {
        var query = data.query || {}
        // var projection = { coverid: 1, title: 1 }
        // CoversModel.find(query, projection).then(function (result) {
        employesmodel.find(query).then(function (result) {
            console.log("find employees......", result)
            resolve(result)
        }, function (error) {
            console.log("error find in employees from db", error)
            reject(error)
        })
    })

}


const editdetails = function (data) {
   
    
    var findquery = {
        employeeid: data.employeeid
    }
    var updateQuery = {
        name: data.name,
        email: data.email,
        deparment: data.deparment,
        image: data.image,
        role: data.role,
        employeesaddress: data.employeesaddress,
        qualification: data.qualification,
        status: data.status,
        dateOfJoin: data.dateOfJoin,
        phone: data.phone
    }
    return new Promise(function (resolve, reject) {
        // let employeesmodel = new employesmodel(data)
        employesmodel.findOneAndUpdate(findquery, updateQuery, {upsert: false,new :true}).then(function (result) {
            console.log("updatae data....", result)
            if(result!=null){
                resolve(result)
            }
            else{
                reject(" something went wrong please check again..")

            }
            
        }, function (error) {
            console.log("some error ")
            reject(error)
        })

    })



   
}

const deleteemployees = function (data) {
    return new Promise(function (resolve, reject) {
        var query = {
            employeeid: data.employeeid

        }
        employesmodel.remove(query).then(function (result) {
            console.log("result removing from db", result)
            // here we manage the if id is not in result in db 
            resolve(result)
        }, function (error) {
            console.log("error removing from db", error)
            reject(error)
        })


    })
}

const oneemployees = function (data) {
    console.log("...........data", data)
    return new Promise(function (resolve, reject) {

        employesmodel.findOne(data).then(function (result) {
            console.log("find employess......", result)
            resolve(result)
        }, function (error) {
            console.log("error find in employees from db", error)
            reject(error)
        })
    })

}


module.exports = {
    store,
    allemployees,
    oneemployees,
    deleteemployees,
    editdetails
}