const Subscription = require("../models/subscription");
const axios = require("axios");
const { validationResult } = require("express-validator");

const createSubscription = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Subscription.create(req.body)
    .then(({ id }) => {
      Subscription.findById(id)
        .populate("event_types")
        .then((sub) => {
          pingNewEndpoint(sub, req.params.app_id);
          res.json(sub);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const pingNewEndpoint = async (subscription, app_id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-team4hook-app_id": app_id,
      "x-team4hook-subscription_id": subscription._id,
      "x-team4hook-event_type": "ping",
    },
    timeout: 5000,
    maxRedirects: 0,
  };

  const body = { msg: "Congrats on creating a new endpoint!" };
  await axios.post(subscription.url, body, config);
};

const getSubscriptions = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Subscription.find({ app_id: req.params.app_id })
    .populate("event_types")
    .then((subs) => {
      res.json(subs);
    })
    .catch((error) => console.log(error));
};

const getSubscriptionsByTopic = (req, res, next) => {
  Subscription.find({
    app_id: req.params.app_id,
    event_types: { $in: req.event.event_type },
  }).then((subscriptions) => {
    req.subscribers = subscriptions.map((sub) => ({
      id: sub._id,
      url: sub.url,
      secret: sub.signingSecret,
    }));

    next();
  });
};

exports.getSubscriptions = getSubscriptions;
exports.getSubscriptionsByTopic = getSubscriptionsByTopic;
exports.createSubscription = createSubscription;
