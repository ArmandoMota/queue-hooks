const Subscription = require("../models/subscription");
const axios = require("axios");

const createSubscription = (req, res, next) => {
  Subscription.create(req.body)
    .then(({ id }) => {
      Subscription.findById(id)
        .populate("topics")
        .then((sub) => {
          pingNewEndpoint(sub);
          res.json({ sub });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const pingNewEndpoint = async (subscription) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-team4hook-eventid": "ping",
    },
    timeout: 5000,
    maxRedirects: 0,
  };
  const body = {
    data: "This is your first event!  Thank you for subscribing.",
  };

  await axios.post(subscription.url, body, config);
};

const getSubscriptions = (req, res, next) => {
  Subscription.find({})
    .populate("topics")
    .then((subs) => {
      res.json({ subs });
    })
    .catch((error) => console.log(error));
};

const getSubscriptionsByTopic = (req, res, next) => {
  Subscription.find({ topics: { $in: req.event.topic } }).then(
    (subscriptions) => {
      req.subscribers = subscriptions.map((sub) => ({
        id: sub._id,
        url: sub.url,
        secret: sub.signingSecret,
      }));

      next();
    }
  );
};

exports.getSubscriptions = getSubscriptions;
exports.getSubscriptionsByTopic = getSubscriptionsByTopic;
exports.createSubscription = createSubscription;
