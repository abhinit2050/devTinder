const express = require("express");
const profileRouter = express.Router();
const {authUser} = require("../middlewares/auth");

profileRouter.get("/profile", authUser, async(req, res)=>{

    try{
            let identifiedProfileUser = req.user;
            res.status(202).send(identifiedProfileUser);

    }catch(err){
        res.status(500).send("Something went wrong! "+err);
    }
});


module.exports = profileRouter