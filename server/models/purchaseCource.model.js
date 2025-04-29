import mongoose from "mongoose";
const CourcePurchaseSchema=new mongoose.Schema({
    courceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cource",
        required:true

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:['pending','completed','failed'],
        default:'pending'

    },
    paymentId:{
        type:String,
        require:true
    }

},{timestamps:true})

export const CourcePurchase=mongoose.model('CourcePurchase',CourcePurchaseSchema)