
const express = require("express");
const userRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl about skills";

userRouter.get("/requests/received/user",authUser,async (req, res)=>{

    try{
        const loggedInUser  = req.user;
        console.log("loggedInUser", loggedInUser._id);

    const connectionRequests = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId",USER_SAFE_DATA);

    res.json({
        message:"Fetched interested requests list",
        data:connectionRequests
    })
    }catch(err){
        res.status(500).send("Something went wrong "+err);
    }
    

});

userRouter.get("/user/connections",authUser, async (req, res)=>{

    try{

        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id, status:"accepted"}
            ]
            
        }).populate("fromUserId", USER_SAFE_DATA);

        const data = connections.map((row) => {
                if(loggedInUser._id.toString() == row.fromUserId._id.toString()){
                    return row.toUserId
                }

                return row.fromUserId;

            });

        res.json({
            data:data
        })

    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
})

module.exports = userRouter;