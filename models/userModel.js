import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVarified:{
        type:Boolean,
        default:false
    }

})

const User=mongoose.model("User",UserSchema)

export default User;