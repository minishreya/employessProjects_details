const jwt=require('jsonwebtoken')
const eloginmodel=require("./models/employees.login.model")
const createToken=function(payload,callback)// payload ek object jismey email bhejna h
{
    console.log(" token created...",payload)
    jwt.sign(payload,"mysecretkey",function(error,token)
{
    if(error)
    {
        callback(error,null)
    }
    else{
        console.log(" token created  ........2........")
        console.log("...........role",payload)
        //console.log(".............payload",payload.role)
        callback(null,token)
    }
})
}

const authenticateEmployee = function( req, res, next ) {
    const token = req.header( 'Authorization' );
    
   
    if( !token ) {
        const error = new Error( 'Token is not sent' );
        error.status = 401;
        return next( error );
    }
    console.log("=>",token)

    // 'abcd' is the secret key - please store this in process.env.* where * is some environment variable like JWT_SECRET (say)
    jwt.verify( token, 'mysecretkey', function ( err, result ) {
        console.log("value are >>>>>>>>>>>>>>",req.body.email,req.body)
        console.log("value of of token....",result.email, result.employeesid, result.role)
    
        if( err ) {
           console.log("not authoried",err)
           res.status(401).send({
               error:"UnAuthorized"
           })
           return
       
        }
        else
        {
            const t=token
             const query={
                 etoken:token

            }
             console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,->",t.replace(/^\s+f/g,""))

            //  eloginmodel.findOne(query).then(function(result){

            //      )}
            eloginmodel.findOne(query).then(function(result)
            {
                if(!result)
                {
                    console.log("not authoried",err)
                    res.status(401).send({
                        error:"UnAuthorized"
                    })
                    return

                }
            })
                if("employee" ===result.role  && req.body.email === result.email && req.body.employeeid ==result.employeesid)
                {
                    // && req.body.employeeid ==result.employeeid
    
                    console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,",req.body)
                    next()
                }
                else{
                    console.log("not authoried",err)
                    res.status(401).send({
                        error:"UnAuthorized"
                    })
                    return
                
                }
           // })

           
        }

       
       // next();
    });
};
const authenticateAdmin = function( req, res, next ) {
    const token = req.header( 'Authorization' );
    

    if( !token ) {
        console.log("not authoried")
        res.status(401).send({
            error:"UnAuthorized"
        })
        return
    
    }

    // 'abcd' is the secret key - please store this in process.env.* where * is some environment variable like JWT_SECRET (say)
    jwt.verify( token, 'mysecretkey', function ( err, result ) {
        if( err ) {
            console.log("not authoried")
            res.status(401).send({
                error:"UnAuthorized"
            })
            return
        
        }
        else
        {
            if("admin" === result.role) //?////////????????////
            {
                next()
            }
            else{
                console.log("not authoried")
           res.status(401).send({
               error:"UnAuthorized"
           })
           return
       
            }
        }

       
       // next();
    });
};


const authenticatetask = function( req, res, next ) {
    const token = req.header( 'Authorization' );
    

    if( !token ) {
        console.log("not authoried")
        res.status(401).send({
            error:"UnAuthorized"
        })
        return
    
    }

    // 'abcd' is the secret key - please store this in process.env.* where * is some environment variable like JWT_SECRET (say)
    jwt.verify( token, 'mysecretkey', function ( err, result ) {
        if( err ) {
            console.log("not authoried")
            res.status(401).send({
                error:"UnAuthorized"
            })
            return
        
        }
        else
        {
            next()
        }
        

       
       // next();
    });
};


module.exports={
    authenticatetask,
    authenticateAdmin,
    authenticateEmployee,
    createToken

}