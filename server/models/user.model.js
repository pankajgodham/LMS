import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["instructor","student"],
        default:"student"
    },
    enrolledCources:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cource"
        }
    ],
     photoUrl:{
        type:String,
        default:""
     }

},{timestamps:true})
export const User= mongoose.model("User",userSchema);