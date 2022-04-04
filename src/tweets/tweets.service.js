const Tweet = require("./Tweet");

const createTweetService = (message, userId) =>
  Tweet.create({ message, user: userId });

const findAllTweetsService = (offset = 0, limit = 5) =>
  Tweet.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countTweets = () => Tweet.countDocuments();

const searchTweetService = (message) =>
  Tweet.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const likesService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const retweetsService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
      "retweets.userId": { $nin: [userId] },
    },
    {
      $push: {
        retweets: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const commetsService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

module.exports = {
  createTweetService,
  findAllTweetsService,
  searchTweetService,
  likesService,
  retweetsService,
  commetsService,
  countTweets,
};
