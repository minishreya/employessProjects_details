const helper=require("../service/helperemployees.workhour")
const AuthService=require("../auth.service")


// var redis = require('redis');
// var jWTR =  require('jwt-redis');
// var redisClient = redis.createClient();
// var jwtr = jWTR(redisClient);


const employeelogin = function (req, res) {
    console.log("data received of find user .......", req.body)
    helper.employeelogin(req.body).then(function (result) {

        if (result) {
            var payload={
                email:result.email,
                role:result.loginrole,
                employeesid:result.employeeid

            }
            console.log("data...token.....",payload)


            AuthService.createToken(payload,function(error,token)
            {

                // add here for toekn in login model ....
                console.log("data...token",token)
                console.log("id value is ", req.body)
                helper.employeestoken(token,req.body).then(function(result){
                    console.log("after toeknnnnnnnnnnnnnnn")
                    if(result)
                    {
                    console.log("result",result)
                    res.set("authtoken",token)

               
                    res.send({
                        message:"Login Done  "+token
                    })
                }
                    else
                    {
                        console.log("not")
                        res.send({
                            message:"Login not  Done"
                        })

                    }
                })
                // res.set("authtoken",token)

               
                //     res.send({
                //         message:"Login Done"+token
                //     })
                

                
            })
            
            console.log("...data",result)
            // res.send({
            //     message: "Login Done"
            // })
        }
        else {
            res.send({
                message: "Invalid credentials"
            })
        }

    }, function (error) {

        console.log("..........error 500", error)


        res.send("data not save")
    })

}

const employeelogout= function(req,res)
{
    const token = req.header( 'Authorization' );
    console.log("ttttttttooooookkkkkkkkkkkeeeeeennnnnn",token)
  //  jwtr.destroy(token)
    console.log("lllllooooooggggggouuuuuuuutttttt")
    res.send("successfully logout")

}




module.exports =
{
    employeelogin,
    employeelogout
}