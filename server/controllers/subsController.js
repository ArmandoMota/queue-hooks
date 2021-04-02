const Subscription = require("../models/subscription");

const getSubscriptions = (req, res, next) => {
  Subscription.find({})
    .populate("topics")
    .then((subs) => {
      res.json({ subs });
    })
    .catch((error) => console.log(error));
};

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

exports.getSubscriptions = getSubscriptions;
exports.createSubscription = createSubscription;
