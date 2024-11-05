const express = require("express");
const requestRouter = express.Router();
const {authUser}  = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest",authUser,(req,res)=>{

    try {
        const identifiedProfileUser = req.user;
        res.send(identifiedProfileUser.firstName +" has sent a connection request");
    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
})

module.exports = requestRouter;