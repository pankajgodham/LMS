import { Cource } from "../models/cource.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromClodinary, deletevideoFromClodinary, uploadMedia } from "../utils/cloudinary.js";
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
export const publishedCource=async(_,res)=>{
  try {
    const cources=await Cource.find({isPublished:true}).populate({path:"creator",select:"name photoUrl"})
    if(!cources){
      return res.status(404).json({
        message: "Course not found",
      });

    }
    res.status(200).json({
      cources,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to get published course",
    });
  }
}
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
    const {courceId} = req.params;
    const cource = await Cource.findById(courceId).populate("lectures");
    if(!cource){
        return res.status(404).json({
            message:"Course not found"
        })
    }
    return res.status(200).json({
        lectures: cource.lectures
    });

} catch (error) {
    console.log(error);
    return res.status(500).json({
        message:"Failed to get lectures"
    })
}
}
export const editLecture=async(req,res)=>{
  try {
    const {lectureTitle,videoInfo,isPreviewFree}=req.body;
    const {courceId,lectureId}=req.params;
    const lecture=await Lecture.findById(lectureId)
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    } 
    if(lectureTitle) lecture.lectureTitle=lectureTitle;
    if(videoInfo?.videoUrl) lecture.videoUrl=videoInfo.videoUrl;
    if(videoInfo?.publicId) lecture.publicId=videoInfo.publicId;
    lecture.isPreviewFree=isPreviewFree;
    await lecture.save()
    const cource=await Cource.findById(courceId);
    if (cource && cource.lectures.includes(lecture._id)) {
      cource.lectures.push(lecture._id)
      await cource.save()
    }
    return res.status(200).json({
      lecture,
      message:"Lecture Updated successfully"
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed To Get Lecture",
    });
  }
}
export const removeLecture=async(req,res)=>{
  try {
    const {lectureId}=req.params;
    const lecture=await Lecture.findByIdAndDelete(lectureId)
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    } 

    if (lecture.publicId) {
      await deletevideoFromClodinary(lecture.publicId)
    }
      await Cource.updateOne(
        {lectures:lectureId},
        {$pull:{lectures:lectureId}}
      )
      return res.status(200).json({
        lecture,
        message:"Lecture Removed successfully"
       });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed To Remove Lecture",
    });
  }
}

export const getLectureById=async(req,res)=>{
  try {
    const {lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    } 
    return res.status(200).json({
      lecture
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed To Get Lecture",
    });
  }
}

export const togglePublishCource=async(req,res)=>{
  try {
    const {courceId}=req.params;
    const {publish}=req.query;
    const cource=await Cource.findById(courceId)
    if (!cource) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    } 
    cource.isPublished=publish==="true";
    await cource.save()
    const statusMessage=cource.isPublished?"Published":"Unpublished"
    return res.status(200).json({
      message:`course is ${statusMessage}`
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed To Publish Course",
    });
  }
}