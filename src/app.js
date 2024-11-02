const express = require("express");
const connectDB = require('./config/database.js');
const User = require('./models/user.js');

const app = express();

//middleware to parse JSON and convert it to JS Object form
app.use(express.json());

connectDB().then(()=>{
    console.log("Database connection established successfully");
    app.listen(7777,()=>{
        console.log("Listening on port 7777");     
    })

}).catch(err=>console.log("Error connecting Database! "+err))

//sign up API
app.post("/signup", async (req, res)=>{
    
   
    try{
        const newUser = new User(req.body)
        await newUser.save();
        res.send("User saved sucessfully");
    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
})


//find user by email
app.get("/user", async (req, res)=>{

    const userEmail = req.body.email;

    try{
        const foundUsers = await User.find({email:userEmail});

        if(foundUsers.length===0){
            res.status(404).send("No users found");
        } else {
            res.send(foundUsers);
        }

    } catch(err){
        res.status(500).send("Something went wrong "+err)
    }

})

//display all users - feed API
app.get("/feed", async (req, res)=>{

    try{
        const all_Users = await User.find({});
        res.status(200).send(all_Users);

    }  catch(err){
        res.status(500).send("Something went wrong "+err)
    }
   
})

//delete a user
app.delete("/user", async (req, res)=>{
    const userId = req.body.userId;

    try{
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch(err){
        res.status(500).send("Something went wrong "+err)
    }

})

//update data of the user

app.patch("/user", async (req, res)=>{

    const userId = req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate(userId, data);
        res.status(200).send("User updated successfully!")

    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
})