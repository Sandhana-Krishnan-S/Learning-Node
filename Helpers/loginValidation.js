const loginValidate = (userData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(userData.Email)) {
        InvalidValue = 'Email'
        return {
            status : false ,
            message : 'Invalid Email Format'
        }
    }
    else {
        return {
            status : true ,
            message : 'Email Format is correct'
        }
    }
}

module.exports = {loginValidate}