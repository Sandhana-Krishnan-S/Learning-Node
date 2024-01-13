const mongoose = require('mongoose')

mongoose.connect(process.env.DB_LINK , {
    dbName : process.env.DB_NAME
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

mongoose.connection.on('connected' , () => {
    console.log("mongoose Connected Succesfully")
})

mongoose.connection.on('error' , (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected' , () => {
    console.log("mongoose is disconnected")
})

process.on('SIGINT' , async () => {
    try {
        await mongoose.connection.close();
    }
    catch(err) {
        console.log(err)
    }
    finally{
        process.exit(0);
    }
})
