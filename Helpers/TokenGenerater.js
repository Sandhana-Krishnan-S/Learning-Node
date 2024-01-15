const jwt = require('jsonwebtoken')

const signAccesstoken = (userId) => {
    return new Promise((resolve, reject) => {
        const payLoad = {
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const option = {
            expiresIn : '1h' ,
            issuer : 'royalWordle.netlyfy.app' ,
            audience : userId
        }
      jwt.sign(payLoad , secret , option , (err , token) => {
        if(err) {
            reject({err})
        }
        else {
            resolve(token)
        }
      })
    })
}


module.exports = {
    signAccesstoken
}