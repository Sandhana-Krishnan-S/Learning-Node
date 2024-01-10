const express = require('express');
const router = require('./Routes/Router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://0.0.0.0:27017/UserName')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();
const port = 3577;

app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
