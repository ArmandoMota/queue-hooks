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
          res.json({ sub });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const deleteSubscription = (req, res, next) => {
  Subscription.findByIdAndRemove(req.params.id).then((err, doc) => {
    res.json(doc);
  });
};

const deleteAllSubscriptions = (req, res, next) => {
  Subscription.deleteMany({}).then((err, doc) => {
    res.json(doc);
  });
};

exports.getSubscriptions = getSubscriptions;
exports.createSubscription = createSubscription;
exports.deleteSubscription = deleteSubscription;
exports.deleteAllSubscriptions = deleteAllSubscriptions;
