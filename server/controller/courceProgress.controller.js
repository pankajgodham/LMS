import { Cource } from "../models/cource.model.js";
import { CourceProgress } from "../models/courceProgress.model.js";

export const getCourceProgress = async (req, res) => {
  try {
    const { courceId } = req.params;
    const userId = req.id;
    let courceProgress = await CourceProgress.findOne({
      courceId,
      userId,
    }).populate("courceId");
    const courceDetail = await Cource.findById(courceId);
    if (!courceDetail) {
      return res.status(404).json({
        message: "Cource not found",
      });
    }
    if (!courceProgress) {
      return res.status(200).json({
        data: {
          courceDetail,
          progress: [],
          completed: false,
        },
      });
    }
    return res.status(200).json({
      data: {
        courceDetail,
        progress: courceProgress.lectureProgress,
        completed: courceProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courceId, lectureId } = req.params;
    const userId = req.id;
    let courceProgress = await CourceProgress.findOne({ courceId, userId });
    if (!courceProgress) {
      courceProgress = new courceProgress({
        userId,
        courceId,
        completed: false,
        lectureProgress: [],
      });
    }
    const lectureIndex = courceProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );
    if (lectureIndex !== -1) {
      courceProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      courceProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }
    const lectureProgressLength = courceProgress.lectureProgress.filter(
      (lectureprog) => lectureprog.viewed
    ).length;
    const cource = await Cource.findById(courceId);
    if (cource.lectures.length === lectureProgressLength)
      courceProgress.completed = true;

    await courceProgress.save();
    return res.status(200).json({
      message: "Lecture Progress Updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courceId } = req.params;
    const userId = req.id;
    const courceProgress = await CourceProgress.findOne({ courceId, userId });
    if (!courceProgress)
      return res.status(404).json({ message: "course Progress not found" });
    courceProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    courceProgress.completed = true;
    await courceProgress.save();
    return res.status(200).json({ message: "course marrk as completed" });
  } catch (error) {
    console.log(error);
  }
};
export const markAsInCompleted = async (req, res) => {
    try {
      const { courceId } = req.params;
      const userId = req.id;
      const courceProgress = await CourceProgress.findOne({ courceId, userId });
      if (!courceProgress)
        return res.status(404).json({ message: "course Progress not found" });
      courceProgress.lectureProgress.map(
        (lectureProgress) => (lectureProgress.viewed = false)
      );
      courceProgress.completed = false;
      await courceProgress.save();
      return res.status(200).json({ message: "course marrk as incompleted" });
    } catch (error) {
      console.log(error);
    }
  };
