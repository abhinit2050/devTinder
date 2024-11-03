const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email "+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password not strong enough!");
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid value for Gender!");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://pixabay.com/images/search/user%20icon/",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL "+value);
            }
        }
    },
    about:{
        type:String,
        default:"Hello! I am using DevTinder! Welcome to my profile"
    },
    skills:{
        type: [String]
    },

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User