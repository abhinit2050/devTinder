const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authAdmin = async (req, res, next)=>{

    console.log("Authenticating the Admin...");
    const isAdmin = token === "abc";

if(!isAdmin){
    console.log("Admin Authentication failed!");
    res.status(401).send("Admin Authentication failed!");
} else {
    console.log("Admin Authentication successful!");
   next();
}

}

const authUser = async (req, res, next) => {
    
    try{console.log("Authenticating User...");
    const {token} = req.cookies;

    if(!token){
        throw new Error("Invalid Token! Please login!");
    }

    const decodedData = await jwt.verify(token,'Dev@Tinder$790');
    
    const {_id} = decodedData;

    const identifiedUser = await User.findById(_id);

    if(!identifiedUser){
        console.log("User Authentication failed! No user found!");
        res.status(401).send("User Authentication failed");
    } else {
        console.log("User Authentication Successful!");
        req.user = identifiedUser;
        next();
    }}catch(err){
        res.status(500).send(""+err);
    }
}

module.exports = {authAdmin, authUser}