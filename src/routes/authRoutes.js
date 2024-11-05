const express = require("express");
const authRouter = express.Router();
const validateSignupData = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");


//sign up API
authRouter.post("/signup", async (req, res)=>{
    
    const {firstName, lastName, email, password} = req.body;
    try{

        //validate the inout data
        validateSignupData(req.body);

        //encrypt the password using bcrypt
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashPassword
        })

        await newUser.save();
        res.send("User saved sucessfully");
    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
});


//login API
authRouter.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body;

        //check for email
        const identifiedUser = await User.findOne({email:email});

        if(!identifiedUser){
            throw new Error("Invalid credentials!");
        } else {
            
            const isPasswordValid = await identifiedUser.validatePassword(password);

          
            if(!isPasswordValid){
                throw new Error("Invalid credentials!");
            } else {
                const token = await identifiedUser.getJWT();

                res.cookie("token",token,{
                    expires:new Date(Date.now()+ 8*3600000) //cookie expires in 8 hours
                });
                res.status(202).send("Login Successful!");
            }
        }

    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
});


module.exports = authRouter