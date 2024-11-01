const authAdmin = (req, res, next)=>{

    console.log("Authenticating the Admin...");
    const token = "abc";
const isAdmin = token === "abc";

if(!isAdmin){
    console.log("Admin Authentication failed!");
    res.status(401).send("Admin Authentication failed!");
} else {
    console.log("Admin Authentication successful!");
   next();
}

}

const authUser = (req, res, next) => {
    
    console.log("Authenticating User...");
    const token = "xyz";

    const isUser = token === "xyz";

    if(!isUser){
        console.log("User Authentication failed");
        res.status(401).send("User Authentication failed");
    } else {
        console.log("User Authentication Successful!");
        next();
    }
}

module.exports = {authAdmin, authUser}