const mongoose = require('mongoose');
const UserData = require('../Model/userModel')

let InvalidValue = '';

function Validate(userData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if((userData.UserName).length < 3) {
        InvalidValue = "UserName"
        return false
    }
    else if(!emailRegex.test(userData.Email)) {
        InvalidValue = 'Email'
        return false
    }
    else if(!passwordRegex.test(userData.Password)) {
        InvalidValue = "Password"
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
        const collection = await UserData.findOne({ UserName: username })

        if(collection.Email === userData.Email) {
            res.status(400).json({
                status : false ,
                message : "You have an existing account"
            })
        }

        else if(collection.UserName === userData.UserName) {
            res.status(400).json({
                status : false ,
                message : "UserName already exists"
            })
        }

        else {
            if(Validate(userData)) {
                const newUser = await new UserData(userData).save();
                res.status(200).json({
                    status : true ,
                    message : 'The User has been succesfully regestered!.'
                })
            }

            else {
                res.status(400).json({
                    status : false ,
                    message : `${InvalidValue} is Invalid`
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