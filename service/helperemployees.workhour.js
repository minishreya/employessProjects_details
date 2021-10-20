const employeesworkhourModel=require("../models/employees.login.model")
const employeelogin = function (data) {
    var query = {
        email: data.email,
        password: data.password
    }
    
    return new Promise(function (resolve, reject) {
        employeesworkhourModel.findOne(query).then(function (result) {
            console.log("result of find user", result)
            resolve(result)
        }, function (error) {
            console.log("user not finf error....", error)
            reject("not find user")
        })
    })



}

const employeestoken=function(token,data)
{
console.log("ttttttttttttt",token)
console.log("ddddddddddd",data)
var query={
    email:data.email
}
var queryupdate={
    employeeid:data.employeeid,
    name:data.name,
    password:data.password,
    email:data.email,
    loginrole:data.loginrole,
    workhour:data.workhour,
    logindate:data.logindate,
    logoutdate:data.logoutdate,
    etoken:token

}

return new Promise(function (resolve, reject) {

employeesworkhourModel.findOneAndUpdate(query,queryupdate).then(function(result)
{
    resolve(result)

},function (error) {
        console.log("user not finf error....", error)
        resolve("not find user")
    })

})
}

module.exports={
    employeelogin,
    employeestoken
}