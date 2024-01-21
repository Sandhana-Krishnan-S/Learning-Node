const { verifyRefreshToken, signAccesstoken, signRefreshtoken } = require("../Helpers/TokenGenerater")

const TokenRefresher = async (req , res) => {
    try {
        const { refreshToken } = req.body
        if(!refreshToken) {
            res.status(402).json({
                status : false , 
                message : "Bad Request"
            })
        }
        else {
            const userId = await verifyRefreshToken(refreshToken)
                    const newAccessToken = await signAccesstoken(userId)
                    const newRefreshToken = await signRefreshtoken(userId)
                    res.status(200).json({
                        status : true ,
                        message : 'Success' ,
                        AccessToken : newAccessToken ,
                        RefreshToken : newRefreshToken ,
                    })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: false,
            message: 'Something Went Wrong'
        });
    }
}

module.exports = TokenRefresher