const express = require('express');
const register = require('../Service/Register');
const login = require('../Service/Login');
const authRouter = express.Router();

authRouter.post('/register' , register)

authRouter.post('/login' , login)

module.exports = authRouter