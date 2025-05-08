import mongoose from "mongoose";

const lectureProgressSchema=new mongoose.Schema({
    lectureId:{type:String},
    viewed:{type:Boolean},
});

const courceProgressSchema=new mongoose.Schema({
    userId:{type:String},
    courceId:{type:String},
    completed:{type:Boolean},
    lectureProgress:[lectureProgressSchema]
});

export const courceProgress=mongoose.model("courceProgress",courceProgressSchema)