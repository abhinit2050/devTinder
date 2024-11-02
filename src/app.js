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

//middleware to parse JSON and convert it to JS Object form
app.use(express.json());

app.post("/signup",async (req,res)=>{

    const newUser = new User(req.body)

    try{

        await newUser.save();
        res.send("New User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the record - "+err);
    }

   
})

