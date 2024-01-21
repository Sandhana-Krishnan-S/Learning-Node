const express = require('express');
const register = require('../Service/Register');
const login = require('../Service/Login');
const TokenRefresher = require('../Service/TokenRefresher');
const authRouter = express.Router();

authRouter.post('/register' , register)

authRouter.post('/login' , login)

authRouter.post('/refreshtoken' , TokenRefresher)

module.exports = authRouter