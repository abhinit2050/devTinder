const express = require("express");

const app = express();

app.get("/user",(req, res)=>{
    res.send({firstName:"Abhinit", lastName:"Rai"})
})

app.post("/user",(req, res)=>{
    res.send("Data successfully saved to database")
})

app.patch("/user",(req, res)=>{
    res.send("Data patched successfully and modified in database")
})


app.delete("/user",(req, res)=>{
    res.send("Deleted successfully!")
})

app.use("/test",(req,res)=>{
    res.send("Hello from server test");
})

app.listen(7777,()=>{
    console.log("Listening on port 7777");
    
})