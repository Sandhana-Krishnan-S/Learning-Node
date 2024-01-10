// routes.js
const express = require('express');
const router = express.Router();
const ApiCall = require('../Controller/apiCall');
const { Username } = require('../Controller/postApi');
const { StoreName } = require('../Controller/StoreName');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/number' , Username);

router.get('/apiCall', ApiCall);

router.post('/postName' , StoreName);

module.exports = router;
