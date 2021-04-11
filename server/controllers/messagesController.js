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
  console.log("sendMessage");

  req.subscribers.forEach((url) => {
    console.log(`notifying ${url} of event ${req.msg.eventId}`);

    const config = { headers: { "Content-Type": "application/json" } };
    // attemptToSend(url, req.msg.payload, config, 0, 1);
    axios
      .post(url, req.msg.payload, config)
      .then((response) => console.log(`confirmed receipt from ${url}`))
      .catch((error) => console.log(error));
  });
};

const attemptToSend = (url, payload, config, delay, retryCount) => {
  axios
    .post(url, payload, config)
    .then((response) => console.log(`confirmed receipt from ${url}`))
    .catch((error) => {
      if (retryCount <= 5) {
        if (retryCount < 5) {
          console.log(
            `Attempt #${retryCount} failed for event \"${payload.type}\" ` +
              `and sender \"${url}\".  Trying again.`
          );
        } else {
          console.log(
            `Attempt #${retryCount} failed for event \"${payload.type}\" ` +
              `and sender \"${url}\".  Last attempt.`
          );
        }

        setTimeout(() => {
          attemptToSend(url, payload, config, delay * 2 + 1, ++retryCount);
        }, delay * 1000);
      }
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
