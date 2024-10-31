const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
    console.log("Common logic for all routes");
    next(); // Pass control to the next matching route
});


app.use("/home",(req,res)=>{
    res.send("Hello from server home!");
})

app.use("/test",(req,res)=>{
    res.send("Hello from server test");
})

app.listen(7777,()=>{
    console.log("Listening on port 7777");
    
})