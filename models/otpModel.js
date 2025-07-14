import mongoose from "mongoose";
const OtpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now,
        expires:300
    }
})

const Otp=mongoose.model("Otp",OtpSchema)
export default Otp;
