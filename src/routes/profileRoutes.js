const express = require("express");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
const {authUser} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");
const {validateSignUpData} = require("../utils/validation");
const validator = require("validator");
const userForgotPasswordAuthentication = require("../utils/ForgotPasswordAuthentication");
const User = require("../models/user");


profileRouter.get("/profile/view", authUser, async(req, res)=>{

    try{
            let identifiedProfileUser = req.user;
            res.status(202).send(identifiedProfileUser);

    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
});


profileRouter.patch("/profile/edit", authUser, async (req,res)=>{

    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit request");

           } else{
            
            const loggedInUser = req.user;
        
            Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);
          
            await loggedInUser.save();
            
            res.status(202).json({
                message:`${loggedInUser.firstName}, your profile has been updated successfully`,
                data:loggedInUser
            });

           }
    }catch(err){
        res.send("Something went wrong! "+err);
    }
   

});

profileRouter.patch("/profile/updatePassword", authUser,async (req, res)=>{
    try{
        let identifiedProfileUser = req.user;
        let inputPassword = req.body.presentPassword;
        let newPassword = req.body.newPassword;
        
        let isExisitingPasswordValid = await identifiedProfileUser.validatePassword(inputPassword);


        if(!isExisitingPasswordValid){
            throw new Error("Existing password value doesn't match!");
        } else{

            const isnewPasswordStrong = validator.isStrongPassword(newPassword);
            if(!isnewPasswordStrong){
                throw new Error("New password not strong enough");
            } else {
                 //encrypt the password using bcrypt
            const hashPassword = await bcrypt.hash(newPassword, 10);

            identifiedProfileUser['password'] = hashPassword;

            await identifiedProfileUser.save();

            res.status(202).send("Password changed successfully!");
            }
            
        }
    }catch(err){
        res.send("Something went wrong! "+err);
    }
});

profileRouter.patch("/profile/forgotPassword", async (req, res)=>{

    let userEmail= req.body.email;
    let newPassword = req.body.newPassword;   
    const identifiedProfileUser = await User.findOne({email:userEmail})
    
        const isUserAuthenticated = userForgotPasswordAuthentication(req.email);
        
    try{
            if(!isUserAuthenticated){
                throw new Error("Authentication unsuccessful! Can't change password!");
            } else{
                const isnewPasswordStrong = validator.isStrongPassword(newPassword);
                if(!isnewPasswordStrong){
                    throw new Error("New password not strong enough");
                } else {
                     //encrypt the password using bcrypt
                const hashPassword = await bcrypt.hash(newPassword, 10);
    
                identifiedProfileUser['password'] = hashPassword;
    
                await identifiedProfileUser.save();
    
                res.status(202).send("Password changed successfully!");
                }
            }
        }catch(err){
            res.send("Something went wrong! "+err);
        }
    
})

module.exports = profileRouter