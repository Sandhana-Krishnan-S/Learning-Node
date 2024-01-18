const express = require('express');
const router = require('./Routes/Router');
const bodyParser = require('body-parser');
const authRouter = require('./Routes/AuthRoutes');
require('dotenv').config();
require('./DB/mongoConnection')


const app = express();
const port = process.env.PORT || 3577;

app.use(bodyParser.json());
app.use('/' , router);
app.use('/auth' , authRouter)

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
