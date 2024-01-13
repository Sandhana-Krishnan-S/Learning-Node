const bodyParser = require('body-parser')
const Username = (req , res) => {
    const result = (req.body.number) ?  req.body.number : 0;
    res.json({result : result})
}

module.exports = {Username};