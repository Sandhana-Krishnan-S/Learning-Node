const bcrypt = require('bcrypt')
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


userSchema.pre('save' , async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.Password , salt)
        this.Password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isValidPassword = async function (Password) {
    try {
        return await bcrypt.compare(Password , this.Password)
    } catch (error) {
        throw error
    }
} 

const UserData = mongoose.model('UserData' , userSchema)

module.exports = UserData