const Topic = require("../models/topic");

const getTopics = (req, res, next) => {
  Topic.find({})
    .then((topics) => {
      res.json({ topics });
    })
    .catch((error) => console.log(error));
};

const createTopic = (req, res, next) => {
  Topic.create(req.body)
    .then((topic) => {
      res.json({ topic });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getTopics = getTopics;
exports.createTopic = createTopic;
