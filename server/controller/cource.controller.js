import { Cource } from "../models/cource.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromClodinary, uploadMedia } from "../utils/cloudinary.js";
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
    const userId = req.id;
    const cources = await Cource.find({ creator: userId });
    if (!cources) {
      return res.status(404).json({
        cource: [],
        message: "No courses found",
      });
    }
    res.status(200).json({
      cources,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const editCource = async (req, res) => {
  try {
    const courceId = req.params.courceId;
    const {
      courceTitle,
      subTitle,
      description,
      category,
      courceLevel,
      courcePrice,
    } = req.body;
    const thumbnail = req.file;
    let cource = await Cource.findById(courceId);
    if (!cource) {
      return res.status(404).json({
        message: "Cource not found",
      });
    }
    let courceThumbnail;
    if (thumbnail) {
      if (cource.courceThumbnail) {
        const publicId = cource.courceThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromClodinary(publicId);
      }
      courceThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = {
      courceTitle,
      subTitle,
      description,
      category,
      courceLevel,
      courcePrice,
      courceThumbnail: courceThumbnail?.secure_url,
    };

    cource = await Cource.findByIdAndUpdate(courceId, updateData, {
      new: true,
    });
    console.log(updateData);

    return res.status(200).json({
      cource,
      message: "cource Updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Edit course",
    });
  }
};

export const getCourceById = async (req, res) => {
  try {
    const { courceId } = req.params;
    const cource = await Cource.findById(courceId);
    if (!cource) {
      return res.status(404).json({
        message: "Cource not found",
      });
    }
    return res.status(200).json({
      cource,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed Get Course",
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courceId } = req.params;
    if (!lectureTitle || !courceId) {
      return res.status(400).json({
        message: "Lecture Title  require",
      });
    }
    const lecture = await Lecture.create({ lectureTitle });
    const cource = await Cource.findById(courceId);
    if (cource) {
      cource.lectures.push(lecture._id);
      await cource.save();
    }
    return res.status(201).json({
      lecture,
      message: "Lecture Created successfully ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed To Create Lecture",
    });
  }
};

export const getCourceLecture = async (req, res) => {
  try {
    const { courceId } = req.params;
    const cource = await Cource.findById(courceId).populate("lectures");
    if (!cource) {
      return res.status(404).json({
        message: "Cource not found",
      });
      
    }
    return res.status(200).json({
     lectures:cource.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed To Get Lecture",
    });
  }
};
