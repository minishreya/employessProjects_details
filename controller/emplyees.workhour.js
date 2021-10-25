const helper=require("../service/helperemployees.workhour")
const AuthService=require("../auth.service")



const employeelogin = function (req, res) {
    console.log("data received of find user .......", req.body)
    if( !req.body.email || !req.body.password ) {
      //  const error = new Error( 'Login details not sent in request body' );
        console.log("not")
                        res.status(400)
                        res.send({
                            message:"'Login details not sent in request body' "
                        })

        return;
    }
    else{
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
                        message:"Login Done  PLEASE use this token:"+token
                    })
                }
                    else
                    {
                        console.log("not")
                        res.status(403)
                        res.send({
                            message:"The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server"
                        })

                    }
                })
              

                
            })
            
            console.log("...data",result)
            // res.send({
            //     message: "Login Done"
            // })
        }
        else {
            res.send({
                message: "Invalid credentials",err
            })
        }

    }, function (error) {

        console.log("..........error 500", error)
        // res.send("data not save")
        res.status(401)
        res.send(
            {message:"unauthorized"+error}
        )
        
    })
}

}

const employeelogout= function(req,res)
{1
    const token = req.header( 'Authorization' );
    console.log("logout toekn in controller",token)
    helper.employeelogout(token,req.body).then(function(result)
    {
        res.send("successfully logout")

    })

    console.log("lllllooooooggggggouuuuuuuutttttt")
   // res.send("successfully logout")

}
const employeesworkhour= function(req,res)
{
    console.log("auth work employees request body data",req.body)
    helper.allworkhrE({ query: req.query }).then(function (result) {
        res.json(result)

    }, function (error) {
        res.status(404)
        res.send(
            {message:"Forbidden"+error}
        )

    })
}




module.exports =
{
    employeelogin,
    employeelogout,
    employeesworkhour
}