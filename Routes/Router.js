const express = require('express');
const router = express.Router();
const ApiCall = require('../Temp/apiCall');
const { Username } = require('../Temp/postApi');
const { StoreName } = require('../Temp/StoreName');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/number' , Username);

router.get('/apiCall', ApiCall);

router.post('/postName' , StoreName);

module.exports = router;
