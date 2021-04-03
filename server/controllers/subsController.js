const Subscription = require("../models/subscription");

const getSubscriptions = (req, res, next) => {
  Subscription.find({})
    .populate("listeningFor")
    .then((subs) => {
      res.json({ subs });
    })
    .catch((error) => console.log(error));
};

const createSubscription = (req, res, next) => {
  Subscription.create(req.body)
    .then(({ id }) => {
      Subscription.findById(id)
        .populate("listeningFor")
        .then((sub) => {
          console.log(sub);
          res.json({ sub });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.getSubscriptions = getSubscriptions;
exports.createSubscription = createSubscription;
