const Subscription = require("../models/subscription");

const createSubscription = (req, res, next) => {
  Subscription.create(req.body)
    .then(({ id }) => {
      Subscription.findById(id)
        .populate("topics")
        .then((sub) => {
          res.json({ sub });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const getSubscriptions = (req, res, next) => {
  Subscription.find({})
    .populate("topics")
    .then((subs) => {
      res.json({ subs });
    })
    .catch((error) => console.log(error));
};

const getSubscriptionsByTopic = async (req, res, next) => {
  const validSubscriptions = await Subscription.find({
    topics: { $in: req.event.topic },
  });
  req.subscribers = validSubscriptions.map((sub) => ({
    id: sub._id,
    url: sub.url,
  }));
  next();
};

exports.getSubscriptions = getSubscriptions;
exports.getSubscriptionsByTopic = getSubscriptionsByTopic;
exports.createSubscription = createSubscription;
