const employeesworkhourModel = require("../models/employees.login.model")
const bcrypt = require( 'bcrypt' );

const employeelogin = function (data) {
    var query = {
        email: data.email
        //,
        //password: data.password
    }
    console.log(" auth before checking data helper",data)

    return new Promise(function (resolve, reject) {
    
        employeesworkhourModel.findOne(query).then(function (result) {
                console.log("auth login find employes",result)
                bcrypt.compare( data.password, result.password, ( err, isMatch ) => {
                    console.log("after bcrypt data ",err,isMatch)
                   // done( err, isMatch );
                });
         
            
            console.log("result of find user", result)
            resolve(result)
        }, function (error) {
            console.log("user not find error....", error)
            reject("not find user")
        })
   
    })



}

const employeestoken = function (token, data) {
    console.log("token taken in token checking first", token)
    console.log("token and data is checking..", data)
    var query = {
        email: data.email
    }
    var queryupdate = {
        employeeid: data.employeeid,
        name: data.name,
        password: data.password,
        email: data.email,
        loginrole: data.loginrole,
        workhour: data.workhour,
        logindate: new Date(),
        logoutdate: data.logoutdate,
        etoken: token

    }

    return new Promise(function (resolve, reject) {

        employeesworkhourModel.findOneAndUpdate(query, queryupdate).then(function (result) {
            resolve(result)

        }, function (error) {
            console.log("user not find error....", error)
            reject("not find user")
        })

    })
}

const employeelogout = function (token, data) {
    console.log("logout toekn ", token)

    console.log("log out data but id is mandatory", data)
    var query = {
        employeeid: data.employeeid
    }
    var queryupdatenew = {
        employeeid: data.employeeid,
        name: data.name,
        password: data.password,
        email: data.email,
        loginrole: data.loginrole,
        workhour: data.workhour,
        logindate: data.employeelogin,
        logoutdate: new Date(),
        etoken: "notadded"

    }

    return new Promise(function (resolve, reject) {
        employeesworkhourModel.findOne(query).then(function (result) {
            if(result.etoken === "notadded")
            {
                reject("Token is invalid")
                return

            }
            else
            { employeesworkhourModel.findOneAndUpdate(query, queryupdatenew).then(function (result) {
                responsetimelogin = result.logindate
                responsetimelogout = result.logoutdate
                console.log("time in value...",responsetimelogin.getTime())
                console.log("time out value...",responsetimelogout.getTime())
                currentworkhr=  responsetimelogin.getTime() - responsetimelogout.getTime()
                updateworkhr = result.workhour+currentworkhr
                console.log("logotout time",updateworkhr)
                var updatehr = {
                    employeeid: data.employeeid,
                    name: data.name,
                    password: data.password,
                    email: data.email,
                    loginrole: data.loginrole,
                    workhour: updateworkhr,
                    logindate: data.employeelogin, // u can set date to zero for logout again not be done
                    logoutdate: new Date(),
                    etoken: "notadded"
                }
                employeesworkhourModel.findOneAndUpdate(query, updatehr).then(function (result) {
                    resolve(result)
                },
                    function (error) {
                        console.log("user upadte hour find error....", error)
                        reject("not hour update at logout",error)
                    })
    
    
            }, function (error) {
                console.log("user not find error....", error)
                reject("not find user while logout",error)
            })
    }

           
           
        }, function (error) {
            console.log("error while logout", error)
            reject(error)
        })
        

       
    })
}
const allworkhrE= function(data)
{
    console.log("all work hour time data", data)
    return new Promise(function (resolve, reject) {
        var query = data.query || {}
        // var projection = { coverid: 1, title: 1 }
        // CoversModel.find(query, projection).then(function (result) {
        employeesworkhourModel.find(query).select({employeeid:true,workhour:true,name:true}).then(function (result) {
            console.log("find employees. of workhour .....", result)
            resolve(result)
        }, function (error) {
            console.log("error find in employees from db for work hour", error)
            reject(error)
        })
    })
}

module.exports = {
    employeelogin,
    employeestoken,
    employeelogout,
    allworkhrE
}