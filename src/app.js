const express = require("express");
const connectDB = require('./config/database.js');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require('./models/user.js');
const {authUser} = require("./middlewares/auth.js");

const app = express();

//middleware to parse JSON and convert it to JS Object form
app.use(express.json());
//middleware for cookie parsing
app.use(cookieParser())


connectDB().then(()=>{
    console.log("Database connection established successfully");
    app.listen(7777,()=>{
        console.log("Listening on port 7777");     
    })

}).catch(err=>console.log("Error connecting Database! "+err))


const authRouter = require("./routes/authRoutes.js");
const profileRouter = require("./routes/profileRoutes.js");
const requestRouter = require("./routes/requestRoutes.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);




// //find user by email
// app.get("/user", async (req, res)=>{

//     const userEmail = req.body.email;

//     try{
//         const foundUsers = await User.find({email:userEmail});

//         if(foundUsers.length===0){
//             res.status(404).send("No users found");
//         } else {
//             res.send(foundUsers);
//         }

//     } catch(err){
//         res.status(500).send("Something went wrong "+err)
//     }

// })

// //display all users - feed API
// app.get("/feed", async (req, res)=>{

//     try{
//         const all_Users = await User.find({});
//         res.status(200).send(all_Users);

//     }  catch(err){
//         res.status(500).send("Something went wrong "+err)
//     }
   
// })

// //delete a user
// app.delete("/user", async (req, res)=>{
//     const userId = req.body.userId;

//     try{
//         await User.findByIdAndDelete(userId);
//         res.send("User deleted successfully");
//     } catch(err){
//         res.status(500).send("Something went wrong "+err)
//     }

// })

// //update data of the user

// app.patch("/user/:userId", async (req, res)=>{

//     const userId = req.params.userId;
//     const data = req.body;

    
//     try{
//         const ALLOWED_UPDATES = ["photoUrl", "about", "skills"];
//         const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));

//         if(!isUpdateAllowed){
//             throw new Error("Update not allowed");
//         }

//         if(data?.length>10){
//             throw new Error("More than 10 skills not allowed!");
//         }
//         await User.findByIdAndUpdate(userId, data,{
//             runValidators:true
//         });
//         res.status(200).send("User updated successfully!")

//     }catch(err){
//         res.status(500).send("Something went wrong! "+err);
//     }
// })

