const axios = require("axios");
const Message = require("../models/message");
const Subscription = require("../models/subscription");

const createMessage = async (req, res, next) => {
  console.log("createMessage");
  Message.create(req.body)
    .then((msg) => {
      req.msg = msg;
      next();
    })
    .catch((error) => console.log(error));
};

const findSubscriptions = async (req, res, next) => {
  console.log("findSubs");
  req.subscribers = [];

  Subscription.find({})
    .then((subs) => {
      console.log(subs);
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

const sendMessage = async (req, res, next) => {
  console.log("sendMessage");
  console.log(req.body);
  req.subscribers.forEach((url) => {
    console.log(`notifying ${url} of event ${req.msg.eventId}`);

    axios
      .post(url, req.msg.payload)
      .then((response) => console.log(`confirmed receipt from ${url}`))
      .catch((error) => console.log(error));
  });
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
