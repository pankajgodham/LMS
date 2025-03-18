import { Cource } from "../models/cource.model.js";

export const createCource = async (req, res) => {
  try {
    const { courceTitle, category } = req.body;
    if (!courceTitle || !category) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const cource = await Cource.create({
      courceTitle,
      category,
      creator: req.id,
    });
    res.status(201).json({
      message: "Cource created successfully",
      cource,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};
export const getCreatorCources = async (req, res) => {
  try {
    const userId=req.id;
    const cources=await Cource.find({creator:userId})
    if(!cources){
        return res.status(404).json({
            cource:[],
            message:"No courses found",
        }
            
        )
    };
    res.status(200).json({
       cources,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};
