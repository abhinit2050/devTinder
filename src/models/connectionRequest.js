const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored", "interested" ,"accepted", "rejected"],
            message:`{VALUE} is incorrect status type`
        },
    },
},
    {timeStamps:true}
);

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;

    //check if the user is sending the connection request to themselves
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Can't send connection request to yourself");
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;