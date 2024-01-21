const jwt = require('jsonwebtoken')
const client = require('./redisConnection')

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

const signRefreshtoken = (userId) => {
    return new Promise((resolve, reject) => {
        const payLoad = {
        }
        const secret = process.env.REFERESH_TOKEN_SECRET
        const option = {
            expiresIn : '3M' ,
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


const verifyToken = (req , res , next ) => {
    try {
        if(!req.headers['authorization']) {
            res.status(401).json({
                status : false ,
                message : 'Unauthorized'
            })
        }
        else {
            const tokenvalue = req.headers['authorization']
            const bearerToken = tokenvalue.split(' ')
            const token = bearerToken[1]
            jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , payload) => {
                if(err) {
                    const message = (err.name === 'TokenExpiredError') ? err.message : 'Unauthorized'
                    res.status(402).json({
                        status : false ,
                        message : message
                    })
                }
                else {
                    req.payload = payload
                    next()
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status : false ,
            message : 'Something went wrong'
        })
    }
}


const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken , process.env.REFERESH_TOKEN_SECRET , (err , payload) => {
            if(err) {
                reject({err})
            }
            else {
                resolve(payload.aud)
            }
        })
    })
}


module.exports = {
    signAccesstoken ,
    signRefreshtoken ,
    verifyToken ,
    verifyRefreshToken
}