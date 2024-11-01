const express = require("express");

const app = express();

const {authAdmin, authUser} = require("./middlewares/auth.js");

app.use("/admin",authAdmin);


app.get("/admin/getAllData",(req,res)=>{
    res.send("All Admin data fetched");
})

app.get("/user/getAllData",authUser,(req, res)=>{
    res.send("All User Data fetched");
});

app.post("/user/login",(req,res)=>{
    
    res.status(200).send("User logged in successfully");
});

app.use("/",(err,req,res,next)=>{
    
    if(err){
        res.status(500).send("something went wrong");
    }
})

app.listen(7777,()=>{
    console.log("Listening on port 7777");
    
})