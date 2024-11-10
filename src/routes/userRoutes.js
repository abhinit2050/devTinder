
const express = require("express");
const userRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/requests/received/user",authUser,async (req, res)=>{

    try{
        const loggedInUser  = req.user;
        console.log("loggedInUser", loggedInUser._id);

    const connectionRequests = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId",["firstName","lastName"])

    res.json({
        message:"Fetched interested requests list",
        data:connectionRequests
    })
    }catch(err){
        res.status(500).send("Something went wrong "+err);
    }
    

});

module.exports = userRouter;