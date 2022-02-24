import { videoModel } from "../models/videoModel.js";

export const getAllVideos = async (req, res) => {
  try {
    const allVideos = await videoModel.find();
    res.json(allVideos);
  } catch (error) {
    res.status(400).json({ message: "Videos not found !" });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: "Video not found !" });
  }
};

export const postVideo = async (req, res) => {
  try {
    const video = await videoModel.create({
      name: req.body.name,
      description: req.body.description,
      file: req?.file?.path || null,
    });
    res.json({ message: "Video created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const putVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);
    video.name = req.body.name;
    video.description = req.body.description;
    video.file = req.file.path || null;

    await video.save();
    res.json({ message: "Video updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const delVideo = async (req, res) => {
  try {
    await videoModel.deleteOne({ _id: req.params.id });
    res.json({ message: "Video deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);
    //add to liked
    if (video.likes.includes(req.user.id)) {
      res.json({ message: "Video already liked" });
    } else {
      //remove from disliked
      if (video.dislikes.includes(req.user.id)) {
        video.dislikes = video.dislikes.filter(function (item) {
          console.log(!item.toString().includes(req.user.id));

          return !item.toString().includes(req.user.id);
        });
        console.log(video.dislikes);
      }
      video.likes = [...video.likes, req.user.id];
      await video.save();
      res.json({ message: "Video liked" });
    }
  } catch (error) {
    res.status(400).json({ message: "Video not found !" });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);
    //add to disliked
    if (video.dislikes.includes(req.user.id)) {
      res.json({ message: "Video already disliked" });
    } else {
      //remove from liked
      if (video.likes.includes(req.user.id)) {
        video.likes = video.likes.filter(function (item) {
          console.log(!item.toString().includes(req.user.id));
          return !item.toString().includes(req.user.id);
        });
      }
      video.dislikes = [...video.dislikes, req.user.id];
      await video.save();
      res.json({ message: "Video disliked" });
    }
  } catch (error) {
    res.status(400).json({ message: "Video not found !" });
  }
};

export const checkUserReactionToVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);
    //check if disliked
    if (video.dislikes.includes(req.user.id)) {
      res.json({
        reaction: "disliked",
      });
      //check if liked
    } else if (video.likes.includes(req.user.id)) {
      res.json({ reaction: "liked" });
    }
    //no reaction
    else {
      res.json({ reaction: "no_reaction" });
    }
  } catch (error) {
    res.status(400).json({ message: "Video not found !" });
  }
};
