const express = require("express");
const connectDB = require('./config/database.js');
const User = require('./models/user.js');
const app = express();

connectDB().then(()=>{
    console.log("Database connection established successfully");
    app.listen(7777,()=>{
        console.log("Listening on port 7777");
        
    })

}).catch(err=>console.log("Error connecting Database! "+err))

app.post("/signup",async (req,res)=>{

    const newUser = new User({
        firstName:"Jaspreet",
        lastName:"Bumrah",
        emailId:"jassy@gmail.com",
        password:"bumrah123"
    })

    try{
        await newUser.save();
        res.send("New User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the record - "+err);
    }

   
})

