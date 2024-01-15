const mongoose = require('mongoose');
const UserData = require('../Model/userModel')
const { signAccesstoken } = require('../Helpers/TokenGenerater')

let InvalidValue = '';

function Validate(userData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if((userData.UserName).length < 3) {
        InvalidValue = "User Name must be between 4 to 15 character"
        return false
    }
    else if(!emailRegex.test(userData.Email)) {
        InvalidValue = 'Invalid Email Format'
        return false
    }
    else if(!passwordRegex.test(userData.Password)) {
        InvalidValue = "Password must have 8 character with atleast 1 Symbol"
        return false
    }
    else {
        return true
    }
}

const register = async (req , res) => {
    try {
        const userData = req.body
        const username = userData.UserName
        const email = userData.Email
        const DoesEmailExist = await UserData.findOne({ Email: email })
        const DoesUserExist = await UserData.findOne({ UserName: username })
        if(DoesEmailExist) {
            res.status(400).json({
                status : false ,
                message : "You have an existing account" ,
                userData : userData
            })
        }
        else if(DoesUserExist) {
            res.status(400).json({
                status : false ,
                message : "UserName already exists"
            })
        }

        else {
            if(Validate(userData)) {
                const newUser = await new UserData(userData).save();
                const accessToken = await signAccesstoken(newUser.id)
                res.status(200).json({
                    status : true ,
                    AccessToken : accessToken ,
                    message : 'The User has been succesfully regestered!.'
                })
            }

            else {
                res.status(400).json({
                    status : false ,
                    message : `${InvalidValue}`
                })
            }
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: false,
            message: 'Something Went Wrong'
        });
    }
}    

module.exports = register