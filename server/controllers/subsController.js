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
  console.log("Creating Sub");
  Subscription.create(req.body)
    .then(({ id }) => {
      Subscription.findById(id)
        .populate("listeningFor")
        .then((sub) => {
          req.sub = sub;
          next();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const sendSubscription = (req, res, next) => {
  console.log("Sending sub");
  const sub = req.sub;
  res.json({ sub });
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
exports.sendSubscription = sendSubscription;
exports.deleteSubscription = deleteSubscription;
exports.deleteAllSubscriptions = deleteAllSubscriptions;
