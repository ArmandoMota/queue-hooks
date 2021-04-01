const axios = require("axios");
const Message = require("../models/message");
const Subscription = require("../models/subscription");

const createMessage = async (req, res, next) => {
  Message.create(req.body)
    .then((msg) => {
      req.msg = msg;
      next();
    })
    .catch((error) => console.log(error));
};

const findSubscriptions = async (req, res, next) => {
  req.subscribers = [];

  Subscription.find({})
    .then((subs) => {
      subs.forEach(({ url, listeningFor }) => {
        if (listeningFor.includes(req.msg.eventId)) {
          req.subscribers.push(url);
        }
      });

      next();
    })
    .catch((error) => console.log(error));
};

const sendMessage = async (req, res, next) => {
  req.subscribers.forEach((url) => {
    console.log(`notifying ${url} of event ${req.msg.eventId}`);

    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(url, req.msg.payload, config)
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
