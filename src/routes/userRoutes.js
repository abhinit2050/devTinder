
const express = require("express");
const userRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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

userRouter.get("/feed",authUser,async (req, res)=>{
    
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit>50 ? 50 : limit;
    const skip = ((page-1)*limit);

   

    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        console.log(connectionRequests);

    const hiddenUsersfromFeed = new Set();

        connectionRequests.forEach((req) =>{
            hiddenUsersfromFeed.add(req.fromUserId.toString());
            hiddenUsersfromFeed.add(req.toUserId.toString());
        });

        const usersInFeed = await User.find({
            $and:[
                { _id: {$nin: Array.from(hiddenUsersfromFeed)}},
                {_id: {$ne:loggedInUser._id}}
            ]
           
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.status(202).send(usersInFeed)


    }catch(err){
        res.status(500).send("Something went wrong "+err);
    }
})
module.exports = userRouter;