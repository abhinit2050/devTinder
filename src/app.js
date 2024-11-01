const express = require("express");
const connectDB = require('./config/database.js');
const app = express();

connectDB().then(()=>{
    console.log("Database connection established successfully");
    app.listen(7777,()=>{
        console.log("Listening on port 7777");
        
    })

}).catch(err=>console.log("Error connecting Database! "+err))

