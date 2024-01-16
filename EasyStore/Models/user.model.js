const mongoose = require("mongoose");



const UserSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        unique:true,
        required:true
    },
    
    Password:{
        type:String,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true
    }
},{
    versionKey:false
})


const User= mongoose.model("User",UserSchema);

module.exports = {User};