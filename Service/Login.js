const { signAccesstoken , signRefreshtoken } = require("../Helpers/TokenGenerater");
const { loginValidate } = require("../Helpers/loginValidation");
const UserData = require("../Model/userModel");

const login = async (req , res) => {
    try {
        const userdata = req.body
        const validateResult = loginValidate(userdata)
        if(!validateResult.status) {
            res.status(400).json(validateResult)
        }
        else {
            const user = await UserData.findOne({Email : userdata.Email});
            if(!user) {
                res.status(404).json({
                    status : false ,
                    message : 'User is not registered'
                })
            }
            else {
                if(user.isValidPassword(userdata.Password)){
                    const accessToken = await signAccesstoken(user.id)
                    const refreshToken = await signRefreshtoken(user.id)
                    res.status(200).json({
                        status : true ,
                        message : 'Login Success' ,
                        AccessToken : accessToken ,
                        RefreshToken : refreshToken ,
                        userData : user
                    })
                }
                else {
                    res.status(400).json({
                        status : false ,
                        message : 'Invalid Email/Password'
                    })
                }
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

module.exports = login