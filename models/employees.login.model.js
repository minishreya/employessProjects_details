const Mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const Schema = Mongoose.Schema
const employeesSchema = new Schema({
    employeeid:{type:Number,unique:true,require:true},
    name:{type:String,require:true},
    password:{type:String,require:true,require:true},
    email:{type:String , unique:true , required:true},
    loginrole:{type:String , default:"employee"},
    workhour:{type:Number,default:00},
    logindate:{type:Date , default : new Date()},
    logoutdate:{type:Date , default : new Date()},
    etoken:{type:String,default:"notaddded"}
})
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
employeesSchema.path( 'email' ).validate(
    email => emailRegex.test( email ),
    'Invalid email id format'
);
const SALT_FACTOR = 10;

employeesSchema.pre( 'save', function( done ) {
    const user = this;

    // password has not been updated
    if( !user.isModified( 'password' ) ) {
        return done();
    }

    // password has been updated - hash and save it
    bcrypt.genSalt( SALT_FACTOR, ( err, salt ) => {
        if( err ) {
            console("salt error hash in login model",err)
            return done( err );
        }

        bcrypt.hash( user.password, salt, ( err, hashedPassword ) => {
            if( err ) {
                console.log("after salt login model",err)
                return done( err );
            }
            console.log("333333333",user.password)

            user.password = hashedPassword;
            done();
        });
    });
});

// employeesSchema.methods.checkPassword = function( password, done ) {
//     console.log("gggshhh")
//     bcrypt.compare( password, this.password, ( err, isMatch ) => {
//         console.log("aaaaaaaaa",err)
//         done( err, isMatch );
//     });
// };


const emodel = Mongoose.model("Elogin",employeesSchema)

module.exports =  emodel


