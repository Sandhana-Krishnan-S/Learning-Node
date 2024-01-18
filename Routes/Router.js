const express = require('express');
const { verifyToken } = require('../Helpers/TokenGenerater');
const router = express.Router();

// router.use(verifyToken);

router.get('/', verifyToken , (req, res) => {
  res.send('Hello World!');
});
module.exports = router;
