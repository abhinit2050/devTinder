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
const userRouter = require("./routes/userRoutes.js");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);




