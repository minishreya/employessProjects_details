const employeesworkhourModel = require("../models/employees.login.model")
const bcrypt = require( 'bcrypt' );

const employeelogin = function (data) {
    var query = {
        email: data.email
        //,
        //password: data.password
    }
    console.log("helper",data)

    return new Promise(function (resolve, reject) {
        // employeesworkhourModel.checkPassword( data.password, ( err, isMatch ) => {
        //     if( err ) {
        //         // const error = new Error( 'No matching credentials' );
        //         // error.status = 404;
        //         console.log("user not finf error....", error)
        //        // return next( error );
        //        reject(err)
        //     }
        employeesworkhourModel.findOne(query).then(function (result) {
           // employeesSchema.methods.checkPassword = function( password, done ) {
                console.log("gggshhh",result)
                bcrypt.compare( data.password, result.password, ( err, isMatch ) => {
                    console.log("aaaaaaaaa",err,isMatch)
                   // done( err, isMatch );
                });
          // };
            
            console.log("result of find user", result)
            resolve(result)
        }, function (error) {
            console.log("user not finf error....", error)
            reject("not find user")
        })
   
    })



}

const employeestoken = function (token, data) {
    console.log("ttttttttttttt", token)
    console.log("ddddddddddd", data)
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
            console.log("user not finf error....", error)
            resolve("not find user")
        })

    })
}

const employeelogout = function (token, data) {
    console.log("ttttttttttttt", token)
    console.log("ddddddddddd", data)
    var query = {
        employeeid: data.employeeid
    }
    var queryupdate = {
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

        employeesworkhourModel.findOneAndUpdate(query, queryupdate).then(function (result) {
            responsetimelogin = result.logindate
            responsetimelogout = result.logoutdate
            currentworkhr=responsetimelogout.getTime() - responsetimelogin.getTime()
            updateworkhr = result.workhour+currentworkhr
            var updatehr = {
                employeeid: data.employeeid,
                name: data.name,
                password: data.password,
                email: data.email,
                loginrole: data.loginrole,
                workhour: updateworkhr,
                logindate: new Date(), // u can set date to zero for logout again not be done
                logoutdate: new Date(),
                etoken: "notadded"
            }
            employeesworkhourModel.findOneAndUpdate(query, updatehr).then(function (result) {
                resolve(result)
            },
                function (error) {
                    console.log("user upadte hour finf error....", error)
                    resolve("not find user")
                })


        }, function (error) {
            console.log("user not finf error....", error)
            resolve("not find user")
        })

    })
}
const allworkhrE= function(data)
{
    console.log("...........data", data)
    return new Promise(function (resolve, reject) {
        var query = data.query || {}
        // var projection = { coverid: 1, title: 1 }
        // CoversModel.find(query, projection).then(function (result) {
        employeesworkhourModel.find(query).select({employeeid:true,workhour:true,name:true}).then(function (result) {
            console.log("find employees......", result)
            resolve(result)
        }, function (error) {
            console.log("error find in employees from db", error)
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