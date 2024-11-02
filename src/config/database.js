const mongoose = require("mongoose");

const connectDB = async() => {
   await mongoose.connect("mongodb+srv://abhinit_nodejs:APj84NaIrM2A1U87@namastenode.jhniy.mongodb.net/devTinder");

}

module.exports = connectDB;

