const express = require("express");
const requestRouter = express.Router();
const {authUser}  = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId",authUser,async (req,res)=>{

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];


        if(!allowedStatus.includes(status)){
            throw new Error ("invalid status value for this request");
        }

        const existingConnection = await ConnectionRequest.findOne({
            $or:
            [
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        });

        if(existingConnection){
            throw new Error("A connection already exists between the two users");
        }

        const toUser = await User.findOne({_id:toUserId});
        if(!toUser){
           return res.status(404).json({
                message:"User not found!"
            })
        }

        const newConnectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })

        const data = await newConnectionRequest.save();
        
        res.status(202).json({
            "message":`Connection request processed successfully! Status: ${status} for ${toUser.firstName}`,
            data
        });
    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
});

requestRouter.post("/request/review/:status/:requestId", authUser, async (req, res)=>{

    try{
        const loggedInUser = req.user;
        
        const{status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
    
        if(!allowedStatus.includes(status)){
            return res.status(404).json({
                message:"Status in the request is not allowed!"
            });
        }
    
        const requiredConnectionRequest = await ConnectionRequest.findOne({
                
                    _id:requestId,
                    toUserId: loggedInUser._id,
                    status:"interested"
                
        });

        if(!requiredConnectionRequest){
            return res.status(404).json({
                message:"Request not found!"
            });
        }

        requiredConnectionRequest.status = status;

        const data = await requiredConnectionRequest.save();

        res.json({
            message:"Connection request "+status,
            data
        })

    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
    

})

module.exports = requestRouter;