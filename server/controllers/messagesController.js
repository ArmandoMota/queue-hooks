const axios = require("axios");
const Message = require("../models/message");
const Subscription = require("../models/subscription");

const async = require("async");

const q = async.queue(async (job) => {
  axios
    .post(job.url, job.data)
    .then((response) => {
      console.log(`Sent message to ${job.url}. Status: ${response.status}`);
    })
    .catch((err) => console.error(err.message));
});

const createMessage = (req, res, next) => {
  console.log("createMessage");
  Message.create(req.body)
    .then((msg) => {
      req.msg = msg;
      next();
    })
    .catch((error) => console.log(error));
};

const createTestMessage = (req, res, next) => {
  console.log("createTestMessage");

  const testMessage = {
    payload: {
      eventType: "Test Ping",
    },
  };

  Message.create(testMessage)
    .then((msg) => {
      req.msg = msg;
      next();
    })
    .catch((error) => console.log(error));
};

const findSubscriptions = (req, res, next) => {
  console.log("findSubs");
  req.subscribers = [];

  Subscription.find({})
    .then((subs) => {
      subs.forEach(({ url, listeningFor }) => {
        console.log(req.msg.eventId);
        if (listeningFor.includes(req.msg.eventId)) {
          req.subscribers.push(url);
        }
      });

      next();
    })
    .catch((error) => console.log(error));
};

const sendMessage = (req, res, next) => {
  console.log("sendMessage");

  req.subscribers.forEach((url) => {
    console.log(`notifying ${url} of event ${req.msg.eventId}`);

    q.push({ url, data: req.msg.payload });
  });

  res.status(202).json(req.msg);
};

const sendTestMessage = (req, res, next) => {
  console.log("sendTestMessage");
  q.push({ url: req.sub.url, data: req.msg.payload });

  next();
};

const getMessages = (req, res, next) => {
  Message.find({})
    .then((msgs) => res.json({ msgs }))
    .catch((error) => console.log(error));
};

exports.getMessages = getMessages;
exports.createMessage = createMessage;
exports.findSubscriptions = findSubscriptions;
exports.sendMessage = sendMessage;
exports.createTestMessage = createTestMessage;
exports.sendTestMessage = sendTestMessage;
