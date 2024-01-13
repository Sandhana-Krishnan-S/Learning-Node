const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    UserName : {
        type : String ,
        unique : true ,
        required : true ,
        trim : true , 
        minLength : 3
    } , 
    Email : {
        type : String ,
        unique : true ,
        required : true ,
        lowercase : true ,
        trim : true
    } ,
    Password : {
        type : String ,
        required : true ,
        trim : true ,
        minLength : 8 , 
        maxLength : 16
    }
})

const UserData = mongoose.model('UserData' , userSchema)

module.exports = UserData