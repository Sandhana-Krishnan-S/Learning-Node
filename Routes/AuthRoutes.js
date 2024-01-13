const express = require('express');
const register = require('../Service/Register');
const authRouter = express.Router();

authRouter.post('/register' , register)

module.exports = authRouter